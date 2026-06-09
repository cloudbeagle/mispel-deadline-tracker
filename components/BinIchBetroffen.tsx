'use client';

/*
 * Querystring params (decision tree state — AC #7):
 *   mixed       boolean  "true"|"false"  — Mixed-Use/Co-Location-Speicher?
 *   eeg         boolean  "true"|"false"  — EEG-Anlage am Netzanschlusspunkt?
 *   netz        boolean  "true"|"false"  — Netzstrom überwiegt beim Laden?
 *   lp          boolean  "true"|"false"  — Ladepunkt-Betreiber?
 *
 * Chooser params (groesse, netzanteil, erloese, messtechnik) are preserved
 * unchanged when this component updates the URL.
 */

import { Suspense, useCallback, useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, RotateCcw, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

type Answer = boolean | null;

interface TreeState {
  mixed: Answer;
  eeg: Answer;
  netz: Answer;
  lp: Answer;
}

const INITIAL_STATE: TreeState = { mixed: null, eeg: null, netz: null, lp: null };

type Verdict = 'green' | 'amber' | 'red' | null;

function computeVerdict(s: TreeState): Verdict {
  if (s.mixed === false) return 'green';
  if (s.mixed === null) return null;
  if (s.eeg === false) return 'green';
  if (s.eeg === null) return null;
  if (s.netz === true) return 'red';
  if (s.netz === null) return null;
  if (s.lp === true) return 'red';
  if (s.lp === false) return 'amber';
  return null;
}

function activeQuestion(s: TreeState): 1 | 2 | 3 | 4 | null {
  if (s.mixed === null) return 1;
  if (s.mixed === false) return null;
  if (s.eeg === null) return 2;
  if (s.eeg === false) return null;
  if (s.netz === null) return 3;
  if (s.netz === true) return null;
  if (s.lp === null) return 4;
  return null;
}

function stateToParams(s: TreeState): URLSearchParams {
  const p = new URLSearchParams();
  if (s.mixed !== null) p.set('mixed', String(s.mixed));
  if (s.eeg !== null) p.set('eeg', String(s.eeg));
  if (s.netz !== null) p.set('netz', String(s.netz));
  if (s.lp !== null) p.set('lp', String(s.lp));
  return p;
}

function paramsToState(p: URLSearchParams): TreeState {
  const parse = (key: string): Answer => {
    const v = p.get(key);
    if (v === 'true') return true;
    if (v === 'false') return false;
    return null;
  };
  return { mixed: parse('mixed'), eeg: parse('eeg'), netz: parse('netz'), lp: parse('lp') };
}

type GreenReason = 'no-mixed' | 'no-eeg';

function greenReason(s: TreeState): GreenReason {
  return s.mixed === false ? 'no-mixed' : 'no-eeg';
}

function redHasLadepunkt(s: TreeState): boolean {
  return s.lp === true;
}

const QUESTIONS = [
  {
    id: 1 as const,
    label: 'Mixed-Use / Co-Location-Speicher?',
    text: 'Wird Ihr Speicher sowohl aus dem Stromnetz als auch aus einer PV-Anlage geladen?',
    hint: 'Mixed-Use = gemeinsame Ladung aus Netz (Graustrom) und PV (Grünstrom) an einem Netzanschlusspunkt.',
    yes: 'Ja, gemischt geladen (Netz + PV)',
    no: 'Nein, rein PV oder rein Netzbezug',
  },
  {
    id: 2 as const,
    label: 'EEG-Anlage am selben Netzanschlusspunkt?',
    text: 'Befindet sich eine EEG-geförderte Erzeugungsanlage (z.B. PV mit EEG-Vergütung) am selben Netzanschlusspunkt wie der Speicher?',
    hint: 'Relevanter Tatbestand: §19 Abs. 3b/3c EEG setzt voraus, dass eine EEG-Anlage beteiligt ist.',
    yes: 'Ja, EEG-Anlage am selben Anschlusspunkt',
    no: 'Nein, keine EEG-Anlage am Anschlusspunkt',
  },
  {
    id: 3 as const,
    label: 'Netz- oder Photovoltaik-Anteil beim Laden?',
    text: 'Welcher Anteil überwiegt beim Laden Ihres Speichers?',
    hint: 'Relevant für die Wahl zwischen Abgrenzungsoption (§19 Abs. 3b) und Pauschaloption (§19 Abs. 3c) EEG.',
    yes: 'Netzstrom überwiegt (>50 % Graustrom)',
    no: 'PV-Strom überwiegt (>50 % Grünstrom)',
  },
  {
    id: 4 as const,
    label: 'Ladepunkt-Betreiber?',
    text: 'Betreiben Sie auch Ladepunkte für Elektrofahrzeuge an diesem Netzanschlusspunkt?',
    hint: 'Ladepunkte fallen ebenfalls unter die MiSpeL-Festlegung (BK6-25-038).',
    yes: 'Ja, ich betreibe Ladepunkte (E-Mobilität)',
    no: 'Nein, reine Speicheranlage',
  },
] as const;

function QuestionRow({
  q,
  state,
  active,
  onAnswer,
}: {
  q: (typeof QUESTIONS)[number];
  state: TreeState;
  active: boolean;
  onAnswer: (key: keyof TreeState, val: boolean) => void;
}) {
  const key = (['mixed', 'eeg', 'netz', 'lp'] as const)[q.id - 1];
  const answered = state[key];
  const reached =
    active ||
    answered !== null ||
    (q.id === 1) ||
    (q.id === 2 && state.mixed === true) ||
    (q.id === 3 && state.mixed === true && state.eeg === true) ||
    (q.id === 4 && state.mixed === true && state.eeg === true && state.netz === false);

  if (!reached) {
    return (
      <div className="flex items-start gap-3 opacity-30">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
          {q.id}
        </span>
        <p className="text-sm text-muted-foreground">{q.label}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-colors',
        active && 'border-primary/40 bg-muted/40',
        !active && answered !== null && 'border-border bg-transparent',
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
            active && 'bg-primary text-primary-foreground',
            !active && answered !== null && 'bg-muted text-muted-foreground',
          )}
        >
          {q.id}
        </span>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">{q.text}</p>
          {active && <p className="text-xs text-muted-foreground">{q.hint}</p>}
          {answered !== null && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-600" />
              {answered ? q.yes : q.no}
            </p>
          )}
        </div>
      </div>
      {active && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => onAnswer(key, true)}
            className="flex flex-1 items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-muted transition-colors"
          >
            <span>{q.yes}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => onAnswer(key, false)}
            className="flex flex-1 items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-muted transition-colors"
          >
            <span>{q.no}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}

const CITATION =
  'Quellen: §19 Abs. 3b/3c EEG 2023 · §85d EEG 2023 · BNetzA BK6-25-038';

function VerdictPanel({ verdict, state }: { verdict: Verdict; state: TreeState }) {
  if (!verdict) return null;

  if (verdict === 'green') {
    const reason = greenReason(state);
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <p className="font-semibold text-green-900">
            Nicht betroffen — MiSpeL gilt nicht für Ihre Anlage
          </p>
        </div>
        <p className="text-sm text-green-800">
          {reason === 'no-mixed'
            ? 'Ihr Speicher wird nicht gemischt aus Netz und PV geladen. Die Messkonzept-Pflicht nach §19 Abs. 3b/3c EEG greift nur bei Mixed-Use-Anlagen.'
            : 'Ohne EEG-geförderte Anlage am Netzanschlusspunkt entfällt die Zuordnungspflicht nach §19 Abs. 3b/3c EEG.'}
        </p>
        <p className="text-xs text-green-700">{CITATION}</p>
      </div>
    );
  }

  if (verdict === 'amber') {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="font-semibold text-amber-900">
            Möglicherweise betroffen — abhängig von Ihrer Messkonzept-Wahl
          </p>
        </div>
        <p className="text-sm text-amber-800">
          Ihr PV-dominierter Mixed-Use-Speicher könnte unter die vereinfachte{' '}
          <strong>Pauschaloption (§19 Abs. 3c EEG)</strong> fallen, die minimale Messanforderungen
          stellt. Je nach Grünstromanteil und vorhandener Messtechnik lohnt sich ein Vergleich beider
          Optionen. Die finale Festlegung (BK6-25-038) ist noch nicht erlassen.
        </p>
        <p className="text-xs text-amber-700">{CITATION}</p>
      </div>
    );
  }

  const hasLp = redHasLadepunkt(state);
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <XCircle className="h-5 w-5 text-red-600 shrink-0" />
        <p className="font-semibold text-red-900">
          Betroffen — MiSpeL gilt; Abgrenzungs- oder Pauschaloption erforderlich
        </p>
      </div>
      <p className="text-sm text-red-800">
        {hasLp
          ? 'Ihr Mixed-Use-Speicher mit Ladepunkt unterliegt der Messkonzept-Pflicht nach §19 Abs. 3b/3c EEG (BK6-25-038). Sie müssen bis spätestens 01.07.2026 (§85d EEG 2023) zwischen Abgrenzungsoption und Pauschaloption wählen.'
          : 'Ihr netzstromdominierter Mixed-Use-Speicher unterliegt der Messkonzept-Pflicht nach §19 Abs. 3b/3c EEG (BK6-25-038). Bis 01.07.2026 (§85d EEG 2023) ist die Wahl zwischen Abgrenzungs- und Pauschaloption erforderlich.'}
      </p>
      <p className="text-xs text-red-700">{CITATION}</p>
      <a
        href="#chooser"
        className="inline-flex items-center gap-1 text-sm font-medium text-red-900 underline hover:no-underline"
      >
        Weiter zum Abgrenzung-vs.-Pauschale-Rechner
        <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}

const TREE_KEYS = ['mixed', 'eeg', 'netz', 'lp'] as const;

function replaceTreeState(next: TreeState) {
  const merged = new URLSearchParams(window.location.search);
  TREE_KEYS.forEach(k => merged.delete(k));
  stateToParams(next).forEach((v, k) => merged.set(k, v));
  const qs = merged.toString();
  window.history.replaceState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`);
}

function BinIchBetrofenInner() {
  const [state, setState] = useState<TreeState>(INITIAL_STATE);

  // Hydrate from URL querystring on mount
  useEffect(() => {
    setState(paramsToState(new URLSearchParams(window.location.search)));
  }, []);

  const answer = useCallback(
    (key: keyof TreeState, val: boolean) => {
      setState(prev => {
        const next = { ...prev, [key]: val };
        // clear downstream answers when branching changes
        if (key === 'mixed' && !val) {
          next.eeg = null; next.netz = null; next.lp = null;
        } else if (key === 'eeg' && !val) {
          next.netz = null; next.lp = null;
        } else if (key === 'netz' && val) {
          next.lp = null;
        }
        replaceTreeState(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    replaceTreeState(INITIAL_STATE);
    setState(INITIAL_STATE);
  }, []);

  const verdict = computeVerdict(state);
  const active = activeQuestion(state);

  return (
    <section id="betroffen" className="rounded-xl border bg-card px-6 py-8 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Bin ich betroffen?</h2>
          <p className="text-sm text-muted-foreground">
            3–4 Fragen · Ergebnis sofort · kein Login
          </p>
        </div>
        {state.mixed !== null && (
          <button
            onClick={reset}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Zurücksetzen"
          >
            <RotateCcw className="h-3 w-3" />
            Zurücksetzen
          </button>
        )}
      </div>

      <div className="space-y-3">
        {QUESTIONS.map((q) => (
          <QuestionRow
            key={q.id}
            q={q}
            state={state}
            active={active === q.id}
            onAnswer={answer}
          />
        ))}
      </div>

      {verdict && <VerdictPanel verdict={verdict} state={state} />}

      <p className="text-[11px] text-muted-foreground border-t pt-3">
        Kein Rechtsrat. Entscheidungshilfe in Größenordnung — finale Festlegung BK6-25-038 noch
        ausstehend. Alle Angaben ohne Gewähr.
      </p>
    </section>
  );
}

export default function BinIchBetroffen() {
  return (
    <Suspense fallback={<div className="rounded-xl border bg-card px-6 py-8 shadow-sm animate-pulse h-64" />}>
      <BinIchBetrofenInner />
    </Suspense>
  );
}
