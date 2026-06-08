export default function WhatHappensExplainer() {
  return (
    <section className="rounded-lg border bg-card px-6 py-5 space-y-3">
      <h2 className="text-lg font-semibold">Was passiert am 01.07.2026?</h2>
      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
        <p>
          Am 30.06.2026 läuft die gesetzliche Frist des <strong className="text-foreground">§85d EEG 2023</strong> ab.
          Die BNetzA muss bis zu diesem Datum die Festlegung MiSpeL (Az.&nbsp;BK6-25-038) erlassen haben.
        </p>
        <p>
          Ab 01.07.2026 tritt die Festlegung in Kraft. Betreiber von gemischt genutzten Batteriespeichern
          (Co-Location PV + Netzstrom) sowie Ladepunktbetreiber müssen sich entscheiden:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>
            <strong className="text-foreground">Abgrenzungsoption (§19 Abs.&nbsp;3b EEG)</strong> — viertelstündliche
            messwertbasierte Zuordnung von Grün- und Graustromanteilen; höhere Messkosten, aber präzise
            EEG-Fördererhaltung auf den Grünstromanteil.
          </li>
          <li>
            <strong className="text-foreground">Pauschaloption (§19 Abs.&nbsp;3c EEG)</strong> — vereinfachter
            Pauschalansatz; minimale Messanforderung, aber pauschaler (i.d.R. ungünstigerer)
            Förder-/Anrechnungsschnitt.
          </li>
        </ul>
        <p>
          Wer keine Wahl trifft, fällt automatisch unter die gesetzliche Standardregelung. Das Tool hilft Dir,
          die für Deinen Speicher wirtschaftlich bessere Option zu identifizieren.
        </p>
        <p className="text-xs italic">
          Keine Rechtsberatung. Entscheidungshilfe auf Basis des Konsultationsentwurfs vom 18.09.2025 —
          finale Festlegung maßgeblich. Letzte Prüfung: 2026-06-08.
        </p>
      </div>
    </section>
  );
}
