import type { ReactNode } from 'react';

const BNETZA_URL =
  'https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/start.html';
const EEG_85D_URL = 'https://www.gesetze-im-internet.de/eeg_2023/__85d.html';
const EEG_19_URL = 'https://www.gesetze-im-internet.de/eeg_2023/__19.html';
const KONSULTATION_URL =
  'https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/artikel.html';
const CONTACT_EMAIL = `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'gaylord.zach@s2tberlin.com'}`;

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-dotted underline-offset-2 hover:no-underline"
    >
      {children}
    </a>
  );
}

export default function RegulatoryExplainer() {
  return (
    <section className="space-y-6">
      {/* Was ist MiSpeL? */}
      <div className="rounded-lg border bg-card px-6 py-5 space-y-3">
        <h2 className="text-lg font-semibold">Was ist MiSpeL?</h2>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">MiSpeL</strong> steht für{' '}
            <em>Marktintegration von Speichern und Ladepunkten</em>. Es ist ein{' '}
            <Src href={BNETZA_URL}>
              Festlegungsverfahren der Bundesnetzagentur (Az.&nbsp;BK6-25-038)
            </Src>
            , das regelt, wie gemischt genutzte Batteriespeicher und Ladepunkte künftig behandelt
            werden — insbesondere wie der aus dem Netz bezogene „Graustrom“ vom solar erzeugten
            „Grünstrom“ zu trennen ist.
          </p>
          <p>
            Rechtsgrundlage ist{' '}
            <Src href={EEG_85D_URL}>§&nbsp;85d EEG&nbsp;2023</Src>, der die BNetzA verpflichtet,
            die Festlegung bis spätestens <strong className="text-foreground">30.06.2026</strong>{' '}
            zu erlassen.{' '}
            <Src href={KONSULTATION_URL}>
              Der Konsultationsentwurf vom 18.09.2025
            </Src>{' '}
            beschreibt zwei Optionen — Abgrenzungsoption und Pauschaloption —, zwischen denen
            betroffene Anlagenbetreiber wählen können.
          </p>
        </div>
      </div>

      {/* Wer ist betroffen? */}
      <div className="rounded-lg border bg-card px-6 py-5 space-y-3">
        <h2 className="text-lg font-semibold">Wer ist betroffen?</h2>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            Die Regelung trifft Betreiber von <strong className="text-foreground">
              Mixed-Use-Batteriespeichern
            </strong>{' '}
            (Co-Location PV&nbsp;+&nbsp;Netzstrom) sowie{' '}
            <strong className="text-foreground">Ladepunktbetreiber</strong> — also Anlagen, die
            sowohl aus einer EEG-Anlage (Photovoltaik) als auch aus dem öffentlichen Netz geladen
            werden können.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>BESS-Betreiber mit Co-Located-PV-Anlage</li>
            <li>Projektierer und Aggregatoren/Direktvermarkter gemischter Speicher</li>
            <li>Ladepunktbetreiber mit direkt verbundener EEG-Anlage</li>
          </ul>
          <p>
            Wer <em>ausschließlich</em> aus erneuerbaren Quellen ohne Netzbezug lädt, ist{' '}
            <strong className="text-foreground">nicht betroffen</strong>. Für alle anderen gilt:
            ohne aktive Entscheidung greift ab Inkrafttreten automatisch die gesetzliche
            Standardregelung.
          </p>
        </div>
      </div>

      {/* Abgrenzungsoption */}
      <div className="rounded-lg border bg-card px-6 py-5 space-y-3">
        <h2 className="text-lg font-semibold">
          Abgrenzungsoption{' '}
          <span className="text-sm font-normal text-muted-foreground">
            (<Src href={EEG_19_URL}>§&nbsp;19 Abs.&nbsp;3b EEG</Src>)
          </span>
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            Die Abgrenzungsoption ist das <strong className="text-foreground">präzise,
            aber aufwendigere Verfahren</strong>. Grundlage ist der{' '}
            <Src href={KONSULTATION_URL}>
              Konsultationsentwurf vom 18.09.2025, Anlage&nbsp;1
            </Src>
            .
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-foreground">Viertelstündliche Messung:</strong> Jeder
              Lade- und Entladevorgang wird in 15-Minuten-Intervallen messtechnisch erfasst
              (Registrierende Leistungsmessung, RLM).
            </li>
            <li>
              <strong className="text-foreground">Formelbasierte Zuordnung Grün-/Graustrom:</strong>{' '}
              Eine mathematische Formel ordnet auf Basis der Messwerte jeden Zeitschritt entweder
              dem EEG-geförderten Grünstromanteil oder dem netzentgeltpflichtigen Graustromanteil
              zu. Die Zuordnung erfolgt anteilig und zeitpunktgenau.
            </li>
            <li>
              <strong className="text-foreground">Messkosten-Implication:</strong> RLM-Messung
              und die dazugehörige Messkonzept-Einrichtung verursachen laufende Mehrkosten
              (typisch mehrere hundert bis tausend Euro/Jahr je nach Anlage und Netzbetreiber).
              Im Gegenzug behält die Anlage die <strong className="text-foreground">volle
              EEG-Förderung auf den exakt abgegrenzten Grünstromanteil</strong>.
            </li>
          </ul>
          <p className="text-xs italic">
            Geeignet wenn: RLM-Messung bereits vorhanden oder die EEG-Vergütung hoch genug ist,
            um die Messkosten zu überkompensieren.
          </p>
        </div>
      </div>

      {/* Pauschaloption */}
      <div className="rounded-lg border bg-card px-6 py-5 space-y-3">
        <h2 className="text-lg font-semibold">
          Pauschaloption{' '}
          <span className="text-sm font-normal text-muted-foreground">
            (<Src href={EEG_19_URL}>§&nbsp;19 Abs.&nbsp;3c EEG</Src>)
          </span>
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            Die Pauschaloption ist das <strong className="text-foreground">einfachere,
            aber pauschalisierende Verfahren</strong>. Grundlage ist der{' '}
            <Src href={KONSULTATION_URL}>
              Konsultationsentwurf vom 18.09.2025, Anlage&nbsp;2
            </Src>
            .
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-foreground">Vereinfachter Pauschalansatz:</strong> Statt
              viertelstündlicher Messwerte wird ein vereinfachtes Berechnungsverfahren verwendet.
              Die Zuordnung von Grün- und Graustrom erfolgt auf Basis von Jahreswerten oder
              festgelegten Pauschalquoten.
            </li>
            <li>
              <strong className="text-foreground">Minimale Messanforderung:</strong> Eine
              RLM-Messung ist nicht zwingend erforderlich; Standardzählertechnik ist in
              vielen Fällen ausreichend. Deutlich niedrigere laufende Messkosten.
            </li>
            <li>
              <strong className="text-foreground">Pauschaler Förder-/Anrechnungsschnitt:</strong>{' '}
              Die Pauschalquote führt i.d.R. zu einem{' '}
              <strong className="text-foreground">ungünstigeren Förderansatz</strong> als die
              exakte Abgrenzung — ein Teil des tatsächlichen Grünstromanteils wird pauschal als
              Graustrom behandelt, was die anrechenbare EEG-Vergütung reduziert.
            </li>
          </ul>
          <p className="text-xs italic">
            Geeignet wenn: keine RLM-Messung vorhanden, Anlage klein oder Netzbezugsanteil gering,
            und der Erlösunterschied die Investition in die Messtechnik nicht rechtfertigt.
          </p>
        </div>
      </div>

      {/* Was dieses Tool NICHT ist */}
      <div className="rounded-lg border border-orange-200 bg-orange-50 px-6 py-5 space-y-3">
        <h2 className="text-lg font-semibold text-orange-900">Was dieses Tool NICHT ist</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-orange-800 pl-2">
          <li>
            <strong>Keine Rechtsberatung.</strong> Die Inhalte ersetzen keine rechtliche oder
            steuerliche Beratung durch einen Fachanwalt oder Steuerberater.
          </li>
          <li>
            <strong>Kein offizielles BNetzA-Tool.</strong> Dieses Tool ist unabhängig von der
            Bundesnetzagentur und gibt ausschließlich die persönliche Einschätzung des Autors
            wieder.
          </li>
          <li>
            <strong>Entscheidungshilfe in Größenordnung.</strong> Die Berechnungen basieren auf
            dem Konsultationsentwurf vom 18.09.2025 und getroffenen Annahmen — sie sind
            Orientierungswerte, keine verbindlichen Zahlen. Die finale{' '}
            <Src href={BNETZA_URL}>Festlegung (BK6-25-038)</Src> ist maßgeblich.
          </li>
        </ul>
        <p className="text-xs text-orange-700 italic">
          Stand: 2026-06-08 · Basis:{' '}
          <Src href={KONSULTATION_URL}>Konsultationsentwurf 18.09.2025</Src> ·
          Aktualisierung nach Festlegungserlass geplant.
        </p>
      </div>

      {/* Invite-correction CTA */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-6 py-5 space-y-3">
        <h2 className="text-lg font-semibold text-blue-900">Praxisfeedback erwünscht</h2>
        <p className="text-sm text-blue-800 leading-relaxed">
          Wo vereinfache ich zu stark? Was fehlt? Sag mir, was Deine Praxis anders sieht.
        </p>
        <p className="text-sm text-blue-800">
          Ich bin kein Energierechts-Experte, sondern ein neugieriger Operator mit
          technisch-produktseitigem Hintergrund. Korrekturen und Ergänzungen von Betreibern,
          Direktvermarktern und Kanzleien sind ausdrücklich willkommen — und machen das Tool
          besser für alle.
        </p>
        <a
          href={CONTACT_EMAIL}
          className="inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 transition-colors"
        >
          Feedback geben
        </a>
      </div>
    </section>
  );
}
