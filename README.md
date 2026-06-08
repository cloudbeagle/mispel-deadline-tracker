# MiSpeL Deadline & Entscheidungs-Tracker

> **Stand: Festlegung noch nicht erlassen** · Gesetzliche Frist: **30.06.2026** (§85d EEG 2023)

Ein Live-Status-Tracker und plain-language Entscheidungshilfe für Betreiber von gemischt genutzten Batteriespeichern (BESS) und Ladepunkten — beantwortet die drei zentralen Fragen zur BNetzA-Festlegung **MiSpeL** (Az. BK6-25-038):

1. **Bin ich betroffen?**
2. **Abgrenzung oder Pauschale — was passt zu meiner Anlage?**
3. **Was kostet mich die Wahl (Größenordnung)?**

---

## Was ist MiSpeL?

**MiSpeL** steht für *Mindestanforderungen an die Speicher- und Ladepunkt-Lieferung* — ein laufendes Festlegungsverfahren der Bundesnetzagentur (BNetzA), Beschlusskammer 6, Az. **BK6-25-038 / 618-25-02**.

Hintergrund: §85d EEG 2023 verpflichtet die BNetzA, bis spätestens **30.06.2026** eine Festlegung zu erlassen, die regelt, wie gemischt geladene Speicher (Netzstrom + EEG-Strom) und Ladepunkte ihre Strombezüge abgrenzen müssen, um die EEG-Förderfähigkeit zu erhalten. Inkrafttreten frühestens 01.07.2026.

Zwei Optionen stehen zur Wahl:

| Option | Paragraf | Kern |
|---|---|---|
| **Abgrenzungsoption** | §19 Abs. 3b EEG | Viertelstündliche messwertbasierte Zuordnung — höhere Messkosten, aber präzise Grünstromabgrenzung |
| **Pauschaloption** | §19 Abs. 3c EEG | Vereinfachter Pauschalansatz — minimale Messanforderung, aber pauschaler (i.d.R. ungünstigerer) Förder-/Anrechnungsschnitt |

**Aktueller Stand:** Konsultationsentwurf vom 18.09.2025 liegt vor; Stellungnahmen-Frist (24.10.2025) abgeschlossen; finale Festlegung noch ausstehend. Der Countdown läuft.

Quellen: [BNetzA MiSpeL-Verfahrensseite](https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/start.html) · Konsultationsentwurf BK6-25-038 (18.09.2025) · §85d EEG 2023 · §118 Abs. 6 EnWG

---

## Für wen ist dieses Tool?

- **BESS-Betreiber** mit gemischter Ladung (PV-Strom + Netzstrom) — Mixed-Use / Co-Location
- **Ladepunktbetreiber** (öffentlich und gewerblich), die EEG-Förderfähigkeit erhalten wollen
- **Projektentwickler und Aggregatoren/Direktvermarkter**, die Speicheranlagen planen oder betreiben
- **Energierechts-Berater und Kanzleien**, die Mandanten zu MiSpeL beraten

Das Tool ist auf **deutsche Mittelstands-Betreiber** ausgerichtet — plain language statt Juristendeutsch.

---

## Was dieses Tool NICHT ist

- **Keine Rechtsberatung.** Jede Entscheidung zwischen Abgrenzungs- und Pauschaloption sollte mit einem Rechtsanwalt oder Energieberater abgestimmt werden.
- **Kein offizielles BNetzA-Tool.** Dieses Tool ist ein unabhängiges Privatprojekt und hat keine Verbindung zur Bundesnetzagentur.
- **Keine bindende Berechnung.** Der Wirtschaftlichkeitsvergleich liefert Größenordnungen, keine investment-grade Kalkulation. Alle Koeffizienten sind als *Annahmen* gekennzeichnet; offene Zahlen (weil die Festlegung noch aussteht) werden explizit als offen ausgewiesen.
- **Keine Garantie auf Aktualität.** Die Festlegung wird voraussichtlich noch vor dem 30.06.2026 erlassen und kann die hier dargestellten Mechaniken ändern. Das Tool wird am Tag der Veröffentlichung aktualisiert — mit einem Changelog. `status.json` ist versioniert und datiert.

---

## Anleitung

### Live-Demo

➡ **[mispel-tracker.vercel.app](https://mispel-tracker.vercel.app)** *(Deployment folgt mit MIS-2)*

### Lokal ausführen

```bash
git clone https://github.com/cloudbeagle/mispel-deadline-tracker.git
cd mispel-deadline-tracker
npm install
npm run dev
# Öffne http://localhost:3000
```

Voraussetzungen: Node.js 18+, npm 9+.

### Embeddable Countdown-Iframe

```html
<iframe
  src="https://mispel-tracker.vercel.app/embed/countdown"
  width="400"
  height="120"
  frameborder="0"
  title="MiSpeL Countdown"
></iframe>
```

Für Kanzlei-Blogs, Operator-Intranets und Newsletter geeignet. Der iframe zeigt immer den aktuellen Stand aus `status.json`.

---

## Features (v0)

| Feature | Beschreibung |
|---|---|
| **Live-Statusbanner** | Aktueller Verfahrensstatus + Countdown bis 30.06.2026, gespeist aus versioniertem `status.json` |
| **"Bin ich betroffen?"** | 3–4-Fragen-Entscheidungsbaum → grün / gelb / rot Urteil |
| **Abgrenzung-vs-Pauschale-Chooser** | Eingaben: Speichergröße, Netzanteil, vorhandene Messtechnik → Optionsempfehlung + Netto-€-Delta (Größenordnung) |
| **Regulatorischer Erklärer** | Die zwei Optionen in plain language, mit Quellenlinks pro Aussage |
| **Querystring-State** | `?groesse=…&netzanteil=…&messtechnik=rlm` — jedes Ergebnis teilbar per URL |
| **Embeddable Iframe** | Countdown-Widget für Drittseiten |

---

## Datenquellen

Alle Daten sind öffentlich zugänglich und quellenverlinkt:

| Quelle | Inhalt | Lizenz |
|---|---|---|
| [BNetzA Verfahrensseite MiSpeL](https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/start.html) | Aktueller Verfahrensstatus, Dokumente | Amtlich / öffentlich |
| Konsultationsentwurf BK6-25-038 (18.09.2025) | Tenor + Anlage 1 (Abgrenzungsoption) + Anlage 2 (Pauschaloption) | Amtlich / öffentlich |
| §85d EEG 2023, §19 Abs. 3b/3c EEG, §118 Abs. 6 EnWG | Gesetzestext | [gesetze-im-internet.de](https://www.gesetze-im-internet.de) |
| Stellungnahmen bne, EnBW, 1KOMMA5° (Docket 618-25-02) | Branchen-Einschätzungen zur Praktikabilität | Öffentlich |
| [open-MaStR (Zenodo DOI 14783581)](https://zenodo.org/records/14783581) | Co-Location BESS in DE potenziell betroffen (Anzahl TBD — wird nach Festlegung aktualisiert) | CC BY 4.0 |

Der prozedural-Status (`status.json`) wird manuell gepflegt, versioniert und datiert — mit direktem Quellenlink zu jedem Update.

---

## Wo vereinfache ich zu stark?

Dieses Tool basiert auf dem Konsultationsentwurf. Einige Koeffizienten (insbesondere Messkonzept-Pauschalen und der genaue Pauschalansatz in §19 Abs. 3c) sind in der finalen Festlegung noch offen — und werden hier explizit so ausgewiesen.

**Korrekturen sind willkommen.** Wer aus der Praxis anderes sieht, schreibt mir bitte — entweder per [Issue auf GitHub](https://github.com/cloudbeagle/mispel-deadline-tracker/issues) oder direkt per E-Mail.

---

## 30-Min-Walkthrough — kostenlos bis 30.06.

**MiSpeL ein Blackbox?** Ich biete bis zum 30.06.2026 kostenlose 30-Minuten-Walkthroughs an — für Betreiber, die wissen wollen, welche Option zu ihrer konkreten Anlage passt und was sie voraussichtlich kosten wird.

📧 **[gaylordzach@gmail.com](mailto:gaylordzach@gmail.com)** — Betreff: "MiSpeL Walkthrough"

Kein Pitch, kein Upsell. Ich lerne dabei, Du bekommst eine zweite Meinung.

---

## Autor

**Gaylord Zach** — [gaylordzach@gmail.com](mailto:gaylordzach@gmail.com) — [LinkedIn](https://www.linkedin.com/in/gaylordzach/)

*Curious operator mit tiefer Product- und Engineering-Erfahrung in angrenzenden Domänen — kein Energierechts-Experte. Ich habe dieses Tool gebaut, weil die drei Kernfragen zu MiSpeL in keinem öffentlichen Tool beantwortet werden und die Frist läuft. Korrekturen von Praktikern sind ausdrücklich erwünscht.*

Kuratiert durch Gaylord Zach · keine Rechtsberatung · keine BNetzA-Verbindung · Entscheidungshilfe in Größenordnung, finale Festlegung maßgeblich.

---

## Lizenz

**Code:** [MIT License](LICENSE) — © 2026 Gaylord Zach

**Daten & Inhalte** (Erklär-Texte, Quellenlinks, `status.json`): [CC BY 4.0](LICENSE-DATA.md) — Gaylord Zach

Kurzversion: Code darfst Du frei verwenden, modifizieren und weitergeben. Inhalte darfst Du teilen und adaptieren, sofern Du den Ursprung nennst.

---

## English Summary

**MiSpeL** is a German regulatory procedure (BNetzA docket BK6-25-038) that will determine, by 30 June 2026, how mixed-use battery storage systems (BESS) and charging points must account for their grid-sourced electricity to retain eligibility for EEG renewable-energy subsidies. Operators face a binary choice: the **Abgrenzungsoption** (§19 para. 3b EEG — quarter-hourly metering-based allocation, higher metering cost, precise green-power separation) vs. the **Pauschaloption** (§19 para. 3c EEG — simplified flat-rate approach, lower metering overhead, less favourable subsidy cut).

This tool helps German BESS operators, charging-point operators, and their advisors answer three questions in plain language: Am I in scope? Which option fits my asset? What is the rough economic difference? It provides a live procedural status banner (fed from a versioned `status.json`), a four-question eligibility decision tree, an option-chooser with an order-of-magnitude €-delta, and a plain-language regulatory explainer with per-claim source links. The tool is built on the September 2025 consultation draft; all open coefficients are explicitly flagged as such until the final Festlegung is published.

The codebase is MIT-licensed; explanatory content and data are CC BY 4.0. Built by Gaylord Zach (gaylordzach@gmail.com) as an independent open-source project — not affiliated with BNetzA. Corrections and expert input are actively invited via GitHub Issues or email.
