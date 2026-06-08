'use client';

import { useState, useEffect } from 'react';
import {
  calculate,
  buildQueryString,
  parseQueryString,
  fmt,
  type ChooserInputs,
  type ChooserResult,
  type Koeffizient,
} from '../lib/chooser';

const DEFAULTS: ChooserInputs = {
  groesseKwh: 500,
  netzanteilProzent: 40,
  erloesEurJahr: 25_000,
  groesseKw: 250,
  hatRlm: false,
};

function KoeffizientRow({ k }: { k: Koeffizient }) {
  return (
    <li className="text-xs text-muted-foreground leading-snug">
      <span className="font-medium text-foreground">{k.name}:</span>{' '}
      <span className={k.offen ? 'text-amber-700' : ''}>{k.wert}</span>
      {' — '}
      <span className={k.offen ? 'italic text-amber-600' : ''}>{k.quelle}</span>
    </li>
  );
}

function EurRow({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-baseline py-1 border-b border-border last:border-0 ${highlight ? 'font-semibold' : ''}`}>
      <span className="text-sm">{label}</span>
      <span className={`tabular-nums text-sm ${value >= 0 ? 'text-green-700' : 'text-red-700'}`}>
        {value >= 0 ? '+' : ''}{fmt(value)} €/Jahr
      </span>
    </div>
  );
}

export default function AbgrenzungChooser() {
  const [inputs, setInputs] = useState<ChooserInputs>(DEFAULTS);
  const [result, setResult] = useState<ChooserResult>(() => calculate(DEFAULTS));
  const [shareUrl, setShareUrl] = useState('');

  // Hydrate from querystring on mount
  useEffect(() => {
    const parsed = parseQueryString(window.location.search);
    if (Object.keys(parsed).length > 0) {
      const merged = { ...DEFAULTS, ...parsed };
      setInputs(merged);
      setResult(calculate(merged));
    }
  }, []);

  // Recompute + update querystring on input change
  useEffect(() => {
    const res = calculate(inputs);
    setResult(res);
    const qs = buildQueryString(inputs);
    const url = `${window.location.pathname}?${qs}`;
    window.history.replaceState({}, '', url);
    setShareUrl(`${window.location.origin}${url}`);
  }, [inputs]);

  function set<K extends keyof ChooserInputs>(key: K, value: ChooserInputs[K]) {
    setInputs(prev => ({ ...prev, [key]: value }));
  }

  const { abgrenzung, pauschale, empfehlung, verdictText, breakEvenErloese } = result;

  const abgrenzungBetter = empfehlung === 'abgrenzung';
  const pauschaleBetter = empfehlung === 'pauschale';

  return (
    <section className="space-y-6">
      {/* Disclaimer banner — AC #5 */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
        <strong>Hinweis:</strong> Dieses Tool berechnet eine Entscheidungshilfe in der Größenordnung,
        keine rechtsverbindliche Aussage. Finale Festlegung maßgeblich.
        Alle Koeffizienten sind Annahmen — offene Werte werden nach Veröffentlichung
        der BNetzA-Festlegung (BK6-25-038) aktualisiert.
      </div>

      {/* Input form — AC #1 */}
      <div className="rounded-xl border bg-card px-6 py-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold">Ihre Anlage</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span className="text-sm font-medium">Speichergröße (kWh)</span>
            <input
              type="number"
              min={1}
              step={10}
              value={inputs.groesseKwh}
              onChange={e => set('groesseKwh', Math.max(1, Number(e.target.value)))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Speicherleistung (kW)</span>
            <input
              type="number"
              min={1}
              step={10}
              value={inputs.groesseKw}
              onChange={e => set('groesseKw', Math.max(1, Number(e.target.value)))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">
              Jährl. Netzbezug-Anteil zum Laden (%)
            </span>
            <input
              type="number"
              min={0}
              max={100}
              step={5}
              value={inputs.netzanteilProzent}
              onChange={e =>
                set('netzanteilProzent', Math.min(100, Math.max(0, Number(e.target.value))))
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground">
              Anteil des aus dem Netz bezogenen Stroms beim Laden (0 = reiner PV-Strom, 100 = reiner Netzstrom)
            </p>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">
              Direktvermarktungs-Erlös p.a. (€)
            </span>
            <input
              type="number"
              min={0}
              step={1000}
              value={inputs.erloesEurJahr}
              onChange={e => set('erloesEurJahr', Math.max(0, Number(e.target.value)))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>

        <div className="space-y-1">
          <span className="text-sm font-medium">
            RLM / viertelstündliche Messung bereits vorhanden?
          </span>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="messtechnik"
                checked={inputs.hatRlm}
                onChange={() => set('hatRlm', true)}
                className="accent-primary"
              />
              <span className="text-sm">Ja</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="messtechnik"
                checked={!inputs.hatRlm}
                onChange={() => set('hatRlm', false)}
                className="accent-primary"
              />
              <span className="text-sm">Nein (muss nachgerüstet werden)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Side-by-side comparison — AC #2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Abgrenzungsoption */}
        <div className={`rounded-xl border px-5 py-5 shadow-sm space-y-4 ${abgrenzungBetter ? 'border-green-400 bg-green-50' : 'bg-card'}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-base">Abgrenzungsoption</h3>
              {/* AC #6 */}
              <p className="text-xs text-muted-foreground mt-0.5">§19 Abs. 3b EEG</p>
            </div>
            {abgrenzungBetter && (
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                Empfohlen
              </span>
            )}
          </div>

          <div className="space-y-0">
            <EurRow label="Geschätzte Messkosten" value={-abgrenzung.messkosten} />
            <EurRow label="Erlösauswirkung (Grünstromanteil)" value={abgrenzung.erloesauswirkung} />
            <EurRow label="Netto-Vorteil p.a." value={abgrenzung.nettoVorteil} highlight />
          </div>

          {/* AC #4 — coefficients */}
          <details className="text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground select-none">
              Annahmen anzeigen
            </summary>
            <ul className="mt-2 space-y-1 pl-1">
              {abgrenzung.koeffizienten.map((k, i) => (
                <KoeffizientRow key={i} k={k} />
              ))}
            </ul>
          </details>
        </div>

        {/* Pauschaloption */}
        <div className={`rounded-xl border px-5 py-5 shadow-sm space-y-4 ${pauschaleBetter ? 'border-green-400 bg-green-50' : 'bg-card'}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-base">Pauschaloption</h3>
              {/* AC #6 */}
              <p className="text-xs text-muted-foreground mt-0.5">§19 Abs. 3c EEG</p>
            </div>
            {pauschaleBetter && (
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                Empfohlen
              </span>
            )}
          </div>

          <div className="space-y-0">
            <EurRow label="Geschätzte Messkosten" value={-pauschale.messkosten} />
            <EurRow label="Erlösauswirkung (Grünstromanteil)" value={pauschale.erloesauswirkung} />
            <EurRow label="Netto-Vorteil p.a." value={pauschale.nettoVorteil} highlight />
          </div>

          {/* AC #4 — coefficients */}
          <details className="text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground select-none">
              Annahmen anzeigen
            </summary>
            <ul className="mt-2 space-y-1 pl-1">
              {pauschale.koeffizienten.map((k, i) => (
                <KoeffizientRow key={i} k={k} />
              ))}
            </ul>
          </details>
        </div>
      </div>

      {/* Verdict — AC #3 */}
      <div className={`rounded-lg border px-5 py-4 text-sm leading-relaxed ${
        empfehlung === 'gleich'
          ? 'border-border bg-muted'
          : 'border-blue-200 bg-blue-50 text-blue-900'
      }`}>
        <p className="font-medium mb-1">Entscheidungshilfe</p>
        <p>{verdictText}</p>
        {breakEvenErloese > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Break-even Abgrenzung vs. Pauschale: ca. {fmt(breakEvenErloese)} €/Jahr Direktvermarktungserlös
          </p>
        )}
      </div>

      {/* Share URL — AC #7 */}
      {shareUrl && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Link zu dieser Berechnung (für MIS-8 / Teilen):
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 rounded-md border border-input bg-muted px-3 py-1.5 text-xs text-muted-foreground font-mono"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-muted transition-colors"
            >
              Kopieren
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
