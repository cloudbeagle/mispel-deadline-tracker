import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Methodik & Über dieses Tool — MiSpeL Deadline Tracker',
  description:
    'Datenquellen, Berechnungsannahmen und Autorblock für den MiSpeL Deadline & Entscheidungs-Tracker (BK6-25-038). Keine Rechtsberatung.',
};

const SOURCES = [
  {
    label: 'BNetzA Festlegungsverfahren MiSpeL — Az. BK6-25-038 / 618-25-02',
    href: 'https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/start.html',
    note: 'Verfahrensseite — primäre Statusquelle für dieses Tool',
  },
  {
    label: '§85d EEG 2023',
    href: 'https://www.gesetze-im-internet.de/eeg_2023/__85d.html',
    note: 'Gesetzliche Fristpflicht der BNetzA (Erlass bis 30.06.2026)',
  },
  {
    label: '§19 Abs. 3b EEG — Abgrenzungsoption',
    href: 'https://www.gesetze-im-internet.de/eeg_2023/__19.html',
    note: 'Viertelstündliche messwertbasierte Zuordnung von Grün- und Graustromanteilen',
  },
  {
    label: '§19 Abs. 3c EEG — Pauschaloption',
    href: 'https://www.gesetze-im-internet.de/eeg_2023/__19.html',
    note: 'Vereinfachter Pauschalansatz; Mindestmessanforderung',
  },
  {
    label: 'Konsultationsentwurf BK6-25-038 vom 18.09.2025',
    href: 'https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/start.html',
    note: 'Tenor + Anlage 1 (Abgrenzungsoption) + Anlage 2 (Pauschaloption) — Basis aller Berechnungsannahmen in diesem Tool',
  },
  {
    label: '§118 Abs. 6 EnWG',
    href: 'https://www.gesetze-im-internet.de/enwg_2005/__118.html',
    note: 'Änderung "wenn" → "soweit" (in Kraft 13.11.2025) — relevant für den Regelungskontext der MiSpeL-Festlegung',
  },
];

const ASSUMPTIONS = [
  {
    label: 'RLM-Messkosten (Abgrenzungsoption)',
    value: 'ca. 1.500–3.000 €/Jahr',
    source: 'Branchenrichtwert (BBH, BDEW-Stellungnahme); exakter Wert abhängig von Netzbetreiber und Messstellenbetreiber',
    open: false,
  },
  {
    label: 'Mess- und Abrechnungsaufwand viertelstündlich (Abgrenzungsoption)',
    value: 'ca. 500–1.200 €/Jahr zusätzlich',
    source: 'Annahme basierend auf typischen RLM-Messkonzept-Ausschreibungen; kein Festlegungswert',
    open: false,
  },
  {
    label: 'Pauschalabschlag auf EEG-Erlöse (Pauschaloption)',
    value: 'noch offen — Festlegung ausstehend',
    source: 'Im Konsultationsentwurf 18.09.2025 als Bandbreite diskutiert; BNetzA hat keinen Endwert veröffentlicht',
    open: true,
  },
  {
    label: 'Pauschaler Netzbezugsanteil (Graustrompauschale)',
    value: 'noch offen — Festlegung ausstehend',
    source: 'Konsultationsentwurf Anlage 2 — Wert wird in der Festlegung fixiert; derzeit kein verbindlicher Prozentwert',
    open: true,
  },
  {
    label: 'Direktvermarktungs-Erlös (Referenzwert für Break-even)',
    value: 'nutzerdefiniert (Eingabe erforderlich)',
    source: 'Kein Standardwert; hängt von Anlage, Vermarktungsvertrag und Marktpreisniveau ab',
    open: false,
  },
  {
    label: 'Schwellenwert EEG-Anlage (Betroffenheit)',
    value: '> 0 kW installierte Leistung + gemischte Ladung (PV + Netzbezug)',
    source: '§19 Abs. 3b/3c EEG i.V.m. Konsultationsentwurf BK6-25-038 — keine kW-Untergrenze definiert; Betroffenheit ergibt sich aus dem Ladeprofil',
    open: false,
  },
];

export default function MetodikPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16 space-y-10">

        <header className="space-y-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← zurück zur Startseite
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mt-3">Methodik & Über dieses Tool</h1>
          <p className="text-muted-foreground text-sm">
            Datenquellen, Berechnungsannahmen und Transparenzinformationen
          </p>
        </header>

        {/* Author block */}
        <section className="rounded-xl border bg-card px-6 py-5 space-y-3">
          <h2 className="text-lg font-semibold">Autor</h2>
          <p className="text-sm leading-relaxed">
            kuratiert von{' '}
            <a
              href="https://www.linkedin.com/in/gaylordzach/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:no-underline"
            >
              Gaylord Zach
            </a>
            {' — '}curious operator w/ deep product+eng background — <span className="font-medium">keine Rechtsberatung</span>.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ich bin kein Energierechtler und kein BNetzA-Mitarbeiter. Ich bin ein Operator mit
            tiefem Produkt- und Ingenieurshintergrund, der die MiSpeL-Materie für sich selbst
            durchgearbeitet hat — und das Ergebnis öffentlich zugänglich macht. Fehler und
            Korrekturen sind ausdrücklich erwünscht.
          </p>
        </section>

        {/* Anti-promise block */}
        <section className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-5 space-y-3">
          <h2 className="text-lg font-semibold text-amber-900">Was dieses Tool NICHT ist</h2>
          <ul className="space-y-2 text-sm text-amber-900 leading-relaxed list-disc list-inside">
            <li>
              <strong>Keine Rechtsberatung.</strong> Alle Entscheidungen zwischen Abgrenzungs- und
              Pauschaloption sollten mit einem Rechtsanwalt oder Energieberater abgestimmt werden.
            </li>
            <li>
              <strong>Kein offizielles BNetzA-Tool.</strong> Dieses Tool ist ein unabhängiges
              Privatprojekt ohne jede Verbindung zur Bundesnetzagentur.
            </li>
            <li>
              <strong>Entscheidungshilfe in Größenordnung.</strong> Der Wirtschaftlichkeitsvergleich
              liefert Größenordnungen, keine investment-grade Kalkulation. Alle Koeffizienten sind
              als <em>Annahmen</em> gekennzeichnet; offene Zahlen werden explizit ausgewiesen.
            </li>
            <li>
              <strong>Finale Festlegung maßgeblich.</strong> Die Festlegung wird voraussichtlich
              noch vor dem 30.06.2026 erlassen und kann hier dargestellte Mechaniken ändern. Das
              Tool wird am Tag der Veröffentlichung aktualisiert — mit Changelog.
            </li>
          </ul>
        </section>

        {/* Primary sources */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Primärquellen</h2>
          <div className="space-y-3">
            {SOURCES.map((s) => (
              <div key={s.label} className="rounded-lg border bg-card px-5 py-4 space-y-1">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline hover:no-underline leading-snug"
                >
                  {s.label}
                </a>
                <p className="text-xs text-muted-foreground">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Computation assumptions */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Berechnungsannahmen</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Jeder Koeffizient ist mit seiner Quelle oder als Annahme gekennzeichnet. Offene
              Zahlen (noch keine finale Festlegung) sind explizit markiert.
            </p>
          </div>
          <div className="space-y-3">
            {ASSUMPTIONS.map((a) => (
              <div key={a.label} className="rounded-lg border bg-card px-5 py-4 space-y-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-medium">{a.label}</span>
                  {a.open ? (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 whitespace-nowrap">
                      noch offen
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground whitespace-nowrap">
                      Annahme
                    </span>
                  )}
                </div>
                <p className="text-sm font-mono text-foreground">{a.value}</p>
                <p className="text-xs text-muted-foreground">{a.source}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">
            Noch offen — Festlegung ausstehend: Diese Werte werden von der BNetzA in der finalen
            Festlegung BK6-25-038 festgesetzt. Das Tool wird am Tag der Veröffentlichung
            aktualisiert.
          </p>
        </section>

        {/* Reach-out hook */}
        <section className="rounded-xl border bg-card px-6 py-6 space-y-3">
          <h2 className="text-lg font-semibold">MiSpeL ein Blackbox?</h2>
          <p className="text-sm leading-relaxed">
            <strong>30-Min-Walkthrough, kostenlos bis 30.06.</strong> — Für Betreiber, die wissen
            wollen, welche Option zu ihrer konkreten Anlage passt und was sie voraussichtlich
            kosten wird.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Kein Pitch, kein Upsell. Ich lerne dabei, Du bekommst eine zweite Meinung auf Basis
            der aktuell verfügbaren Entwurfslage.
          </p>
          <a
            href="mailto:gaylordzach@gmail.com?subject=MiSpeL%20Walkthrough"
            className="inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Walkthrough anfragen → gaylordzach@gmail.com
          </a>
          <p className="text-xs text-muted-foreground">
            Betreff: &ldquo;MiSpeL Walkthrough&rdquo; · Angebot gilt bis 30.06.2026
          </p>
        </section>

        {/* Back link */}
        <div className="pt-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← zurück zur Startseite
          </Link>
        </div>

      </div>
    </main>
  );
}
