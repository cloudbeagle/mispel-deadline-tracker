# Regulatory fact-check — trawa Head of Product deck

Date: 2026-05-18
Scope: three regulatory claims from `deck-v2-plan.md` Slide 4 ("Regulatorisches Zeitfenster").
Method: primary sources (gesetze-im-internet.de, BNetzA Beschlusskammer 4) first; trade/legal commentary (BBH-Blog, FfE, BDEW) second.

---

## TL;DR

| # | Claim | Verdict |
|---|---|---|
| 1 | §19 Abs. 2 StromNEV "Schwellwert: 100 kW Differenz" + "20–40 % Rabatt" | **Refuted (both halves wrong, but in opposite directions)** |
| 2 | §118 Abs. 6 EnWG: 2025-11-13 amendment, "wenn"→"soweit", 20 yr exemption, 2029-08-04 cutoff | **Confirmed** |
| 3 | MiSpeL-Verfahren still open, FfE "auf dünnem Eis" | **Confirmed** — and we have a hard deadline: 2026-06-30 |

**Single most important correction:** Slide 4 conflates two different §19 StromNEV regimes and *understates* the discount. The "100 kW" figure is a real number — it is the **Mindestlastverschiebung** (minimum load shift) for atypische Netznutzung, not a "Schwellwert: 100 kW Differenz" — and the discount range is **up to 80 %** of the regular Netzentgelt (i.e. customer pays minimum 20 %), not 20–40 %. If a founder challenges the 20–40 % figure, the candidate looks like they read a marketing blog instead of the StromNEV. **Fix this before the panel.**

---

## Claim 1 — §19 Abs. 2 StromNEV: thresholds + discount range

### Claim as stated in draft
> "Schwellwert: 100 kW Differenz" und "20–40 % Netzentgeltrabatt" für die atypische Netznutzung nach §19 Abs. 2 StromNEV.

(Source: `deck-v2-plan.md` line 40, also reflected in `context/energy-domain.md` line 13.)

### Verdict
**Refuted on both numbers.** The "100 kW" figure exists but is mislabelled. The "20–40 %" discount range is materially understated — the correct range is **20–80 % rabatt** (customer pays **20–80 %** of the regular Netzentgelt, i.e. minimum 20 %).

### Ground truth

There are **two distinct regimes** inside §19 Abs. 2 StromNEV that are routinely conflated in non-specialist coverage. The deck garbles them.

**a) §19 Abs. 2 Satz 1 — atypische Netznutzung** (the one trawa Manage actually plays with via Hochlastzeitfenster):

- **Voraussetzungen** (BNetzA Festlegung **BK4-13-739** vom 11.12.2013, zuletzt geändert durch BK4-22-089 / BK4-22-089A02 v. 18.06.2024):
  - Jahreshöchstlast tritt vorhersehbar in lastschwachen Zeiten auf (außerhalb des netzbetreiberspezifischen Hochlastzeitfensters).
  - **Mindestlastverschiebung: 100 kW** (über alle Netz- und Transformatorebenen hinweg) — *dies ist der einzige 100-kW-Wert in §19; vermutlich Quelle der Verwechslung im Deck.*
  - Lastreduktion innerhalb des Hochlastzeitfensters muss prognostisch einen vorgegebenen Prozentsatz der absoluten Jahreshöchstlast unterschreiten. Der Wert variiert je nach Spannungsebene (z. B. Niederspannung 30 %).
  - Erwartete Entgeltminderung mindestens **500 €/Jahr** (Erheblichkeitsschwelle).
- **Höhe des Rabatts**: das individuelle Netzentgelt muss mindestens **20 %** des allgemeinen Netzentgelts betragen (§19 Abs. 2 Satz 5 StromNEV) → **maximal 80 % Rabatt**. Der konkrete Rabatt ergibt sich rechnerisch daraus, dass für die Leistungspreis-Abrechnung nur die innerhalb des Hochlastzeitfensters auftretende Höchstlast zählt, statt der absoluten Jahreshöchstlast.

**b) §19 Abs. 2 Satz 2 — stromintensive ("Bandlast-") Netznutzung** (NICHT was die Folie meinen sollte, gehört aber zur selben Norm):

- **Voraussetzungen** (gesetze-im-internet.de, §19 Abs. 2 Satz 2 StromNEV): Benutzungsstundenzahl ≥ **7 000 h/Jahr** UND Stromverbrauch ≥ **10 GWh/Jahr** an einer Abnahmestelle.
- **Höhe**: individuelles Entgelt mindestens **20 %** (bei ≥ 7 000 h), **15 %** (bei ≥ 7 500 h), **10 %** (bei ≥ 8 000 h) des veröffentlichten Netzentgelts.

Die Festlegung **BK4-13-739** ist seit 2013 in Kraft, mit Anpassungen 2017 (A02) und 2024 (A02 zu BK4-22-089). Parallel läuft seit 2024 **BK4-24-027**, ein Reformverfahren zur Neujustierung der industriellen Sonder-Netzentgelte; eine finale Festlegung ist bis Stand Mai 2026 nicht ergangen, sodass BK4-13-739 weiterhin gilt.

Das im `context/energy-domain.md` zitierte **„20–40 % Rabatt"** stammt sehr wahrscheinlich aus einer journalistischen Vereinfachung (Cleantechie-Artikel `-€855_MWh_…`) — *typische* erzielbare Rabatte für mittlere Industriekunden liegen erfahrungsgemäß in diesem Bereich, aber das ist eine **empirische Bandbreite**, nicht der gesetzliche Rahmen. Vor einem Panel von Energie-Gründern sollte die juristische Range (max. 80 %) gegeben werden, nicht die heuristische.

### Recommended wording for the deck

> §19 Abs. 2 Satz 1 StromNEV (atypische Netznutzung, BNetzA-Festlegung BK4-13-739): Lastverschiebung von ≥ 100 kW aus dem Hochlastzeitfenster heraus reduziert das individuelle Netzentgelt auf bis zu 20 % des Standardentgelts — also bis zu 80 % Rabatt; in der Praxis bei Gewerbekunden meist 20–40 %.

### Sources
- Primärquelle: [§ 19 StromNEV (gesetze-im-internet.de)](https://www.gesetze-im-internet.de/stromnev/__19.html)
- BNetzA Festlegung: [BK4-13-739 Beschluss-Seite](https://www.bundesnetzagentur.de/DE/Beschlusskammern/1_GZ/BK4-GZ/2013/2013_bis0999/2013_bis799/BK4-13-0739/BK4-13-0739_Beschluss.html)
- Eckpunktepapier zur Festlegung: [BK4-13-739 A01 Eckpunktepapier (PDF)](https://www.bundesnetzagentur.de/DE/Beschlusskammern/1_GZ/BK4-GZ/2013/2013_bis0999/2013_bis799/BK4-13-0739/BK4-13-0739A01_Eckpunktepapier_Festlegung%20_BF.pdf)
- BNetzA FAQ: [Häufig gestellte Fragen zur Festlegung (PDF)](https://www.bundesnetzagentur.de/DE/Beschlusskammern/BK04/BK4_71_NetzE/BK4_71_Ind_NetzE_Strom/Downloads/FAQ_Haeufig_gestellte_Fragen.pdf)
- Übersichtsseite: [BNetzA — Individuelle Netzentgelte Strom §19 StromNEV](https://www.bundesnetzagentur.de/DE/Beschlusskammern/BK04/BK4_71_NetzE/BK4_71_Ind_NetzE_Strom/BK4_Ind_NetzEntg_Strom.html)
- Industriedarstellung: [TenneT — Atypische Netznutzung](https://www.tennet.eu/de/strommarkt/strommarkt-deutschland/netzentgelte/atypische-netznutzung)
- Reformverfahren: BK4-24-027 (Sondernetzentgelte-Reform), läuft, keine finale Festlegung Stand Mai 2026.

---

## Claim 2 — §118 Abs. 6 EnWG Mixed-Use cutoff

### Claim as stated in draft
> Bundestag-Novelle vom **2025-11-13**: Änderung "wenn" → "soweit" macht Mixed-Use-Speicher anteilig netzentgeltbefreit (vorher all-or-nothing). 20 Jahre Befreiung. Inbetriebnahme-Stichtag: **2029-08-04**.

(Quellen: `deck-v2-plan.md` Z. 41, `context/energy-domain.md` Z. 11.)

### Verdict
**Confirmed in full.** Datum, Wortänderung, Befreiungsdauer und Stichtag stimmen alle mit dem aktuellen Gesetzestext und Sekundärliteratur (BBH, Raue, Noerr, BDO, FfE) überein.

### Ground truth

- **Bundestag-Datum**: Der Wirtschaftsausschuss beschloss am **12.11.2025** Änderungsanträge zur EnWG-Novelle, der Bundestag verabschiedete am Abend des **13.11.2025** die geänderte Fassung. Bestätigt von mehreren Kanzleien (Noerr, Raue, BDO).
- **Wortlaut Satz 3** (gesetze-im-internet.de, aktuelle Fassung): *„Die Freistellung nach Satz 1 wird nur gewährt, soweit die elektrische Energie zur Speicherung in einem elektrischen, chemischen, mechanischen oder physikalischen Stromspeicher aus einem Transport- oder Verteilernetz entnommen und die zur Ausspeisung zurückgewonnene elektrische Energie zeitlich verzögert wieder in dasselbe Netz eingespeist wird; § 21 des Energiefinanzierungsgesetzes gilt entsprechend."*
  - Das maßgebliche Wort ist **„soweit"** (vorher: „wenn"). Mixed-Use-Speicher (PV + Netz) werden dadurch **anteilig** befreit, statt wie zuvor komplett ausgeschlossen zu sein.
  - Der Verweis auf **§ 21 EnFG** zieht bidirektionale Ladepunkte (V2G) in denselben Privilegienkreis ein.
- **Stichtag Inbetriebnahme**: **04.08.2029** (im Gesetzestext: „innerhalb von 18 Jahren ab 4. August 2011" — das ergibt rechnerisch den 04.08.2029). Datumsformat DD.MM.JJJJ (deutsch) bzw. ISO 2029-08-04. **Keine Ambiguität.**
- **Dauer der Befreiung**: **20 Jahre ab Inbetriebnahme** für neu errichtete Speicher (10 Jahre für ertüchtigte Pumpspeicher, irrelevant für Batterien). Bestätigt FfE-Artikel v. 19.12.2025.
- **Klassen**: Die Befreiung gilt für **alle** Stromspeicher i.S.d. §118 Abs. 6 Satz 1 EnWG, die *nach* dem 4. August 2011 neu errichtet wurden, also auch sämtliche Mixed-Use-Batterien — vorausgesetzt, die Inbetriebnahme erfolgt vor dem 04.08.2029 und die Energie wird zeitlich verzögert in dasselbe Netz zurückgespeist (Satz 3).

**Strategische Vorsicht (FfE-Disclaimer):** Die FfE warnt, dass die BNetzA „jederzeit abweichende Regelungen erlassen" könne und Zweifel an EU-rechtlicher Kostenwahrheits-Konformität bestehen. Die 20-Jahre-Befreiung ist also **nicht** so bestandsfest, wie der Gesetzestext suggeriert. Diese Caveat sollte im Deck stehenbleiben — sie ist genau die Senior-Signal-Aussage, die der retro-Plan ohnehin schon vorsieht.

### Recommended wording for the deck

> §118 Abs. 6 EnWG (Bundestags-Novelle v. 13.11.2025): Wechsel von „wenn" auf „soweit" — Mixed-Use-Batteriespeicher sind anteilig 20 Jahre lang von Netzentgelten befreit, sofern Inbetriebnahme bis 04.08.2029 erfolgt. BNetzA kann die Mechanik jederzeit nachjustieren.

### Sources
- Primärquelle: [§ 118 EnWG (gesetze-im-internet.de)](https://www.gesetze-im-internet.de/enwg_2005/__118.html)
- FfE-Analyse („dünnes Eis"): [Neue Netzentgelt-Privilegien für Speicheranlagen und Ladepunkte](https://www.ffe.de/veroeffentlichungen/neue-netzentgelt-privilegien-fuer-speicheranlagen-und-ladepunkte-stehen-die-befreiungen-auf-duennem-eis/) (19.12.2025)
- Kanzlei-Kommentare: [Raue — EnWG-Novelle](https://raue.com/en/news/industries/energy-and-climate-change/energy/energy-industry-act-amendment-network-fee-privileges-expanded-for-energy-storages-and-bidirectional-charging-points/) · [Noerr — Batteriespeicher, Energy Sharing, Kundenanlage](https://www.noerr.com/de/insights/batteriespeicher-energy-sharing-kundenanlage-und-netzbetreiber-welche-neuerungen-die-anderung-des-energiewirtschaftsrechts-vorsieht) · [BDO Legal](https://www.bdolegal.de/de-de/erweiterte-suche/aktuelles/2025/neuerungen-fur-batteriespeicher-und-dezentrale-versorgung-kundenanlage-und-energy-sharing) · [RGC News — §118 Abs. 6 EnWG anteilige Netzentgeltbefreiung](https://rgc-news.de/post/3697/118-abs-6-enwg-die-anteilige-netzentgeltbefreiung-fuer-stromspeicher)
- Wissenschaftliche Dienste BT: [WD 5 — 3000 — 080/25 (PDF)](https://www.bundestag.de/resource/blob/1145874/WD-5-080-25.pdf)

---

## Claim 3 — MiSpeL-Verfahren Status

### Claim as stated in draft
> BNetzA **MiSpeL-Verfahren** noch offen — definiert Messkonzept für Mixed-Use-Speicher unter dem neuen §118-Regime. FfE: „auf dünnem Eis".

(Quellen: `deck-v2-plan.md` Z. 42, `context/energy-domain.md` Z. 11 und Z. 30.)

### Verdict
**Confirmed — und präzisierbar.** Verfahren läuft noch, **harter Deadline 30.06.2026** (gesetzliche Frist nach § 85d EEG 2023). Bis dahin muss eine finale Festlegung vorliegen. FfE-Wortlaut „dünnes Eis" ist korrekt zitiert (Publikation v. 19.12.2025).

### Ground truth

- **Bezeichnung**: „**Festlegung zur Marktintegration von Speichern und Ladepunkten (MiSpeL)**", Aktenzeichen **BK6-25-038 / Referenz 618-25-02**. Der Begriff *„MiSpeL-Verfahren"* ist korrekt und auch in der BNetzA-Pressekommunikation verankert — keine Umbenennung erfolgt.
- **Verfahrensstand (Stand Mai 2026, also heute)**:
  - 31.07.2025: Verfahren formell eröffnet.
  - 18.09.2025: Konsultationsentwurf veröffentlicht (Tenor + Anlage 1 „Abgrenzungsoption" + Anlage 2 „Pauschaloption").
  - 01.10.2025: Workshop.
  - 24.10.2025: Frist Stellungnahmen (48 Stellungnahmen eingegangen).
  - 12.11.2025: letzte BNetzA-Aktualisierung der Verfahrensseite.
  - **30.06.2026: gesetzliche Frist für Erlass der Festlegung** (§ 85d EEG 2023). Inkrafttreten muss spätestens 01.07.2026 erfolgen.
- **Inhalt**: Definiert, wie bei Mixed-Use-Speichern „grauer" und „grüner" Strom mathematisch getrennt werden — zwei Optionen:
  - **Abgrenzungsoption**: viertelstündliche Messung + formelbasierte anteilige Zuordnung.
  - **Pauschaloption**: vereinfachtes Verfahren für kleinere Anlagen mit minimalen Messanforderungen.
- **FfE-Position** (Publikation 19.12.2025, „auf dünnem Eis"): kritisiert, dass die finanziellen Anreize zur **Falschausweisung von Graustrom** durch die neuen Regelungen *gestiegen* sind, weil Vergütung für Graustrom in Mixed-Use-Konstellationen attraktiver werden kann als für Grünstrom — Integritätsrisiko für das gesamte MiSpeL-Konstrukt, das die BNetzA noch nicht abschließend gelöst hat. Die Aussage „dünnes Eis" bezieht sich **nicht** auf MiSpeL allein, sondern auf das **Zusammenspiel** §118 EnWG + MiSpeL + EU-Kostenwahrheits-Vorgaben — wichtige Nuance, falls jemand im Panel nachhakt.

### Recommended wording for the deck

> BNetzA-Verfahren MiSpeL (BK6-25-038) — Konsultationsentwurf 09/2025, finale Festlegung bis 30.06.2026 gesetzlich geboten; Messkonzept (Abgrenzungs- vs. Pauschaloption) bis dahin offen. FfE warnt: Anreize zur Graustrom-Deklaration noch ungelöst — strategisches Beobachtungsfeld.

### Sources
- BNetzA-Verfahrensseite: [Festlegungsverfahren MiSpeL](https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/start.html)
- BNetzA-Artikelseite: [Festlegung zur Marktintegration von Speichern und Ladepunkten (MiSpeL)](https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/artikel.html)
- FfE: [Neue Netzentgelt-Privilegien — auf dünnem Eis?](https://www.ffe.de/veroeffentlichungen/neue-netzentgelt-privilegien-fuer-speicheranlagen-und-ladepunkte-stehen-die-befreiungen-auf-duennem-eis/)
- BBH-Blog: [MiSpeL-Entwurf der BNetzA](https://www.bbh-blog.de/allgemein/mispel-entwurf-der-bnetza-das-ende-des-dornroeschenschlafs-fuer-speicher-und-ladepunkte/) (Update v. 27.02.2026)
- Stellungnahmen (Beispiel): [bne-Stellungnahme zur MiSpeL-Festlegung](https://www.bne-online.de/stellungnahme-zur-mispel-festlegung-und-appell-an-verteilnetzbetreiber/) · [EnBW-Stellungnahme (PDF)](https://data.bundesnetzagentur.de/Bundesnetzagentur/SharedDocs/Downloads/DE/Sachgebiete/Energie/Unternehmen_Institutionen/ErneuerbareEnergien/Mispel/enbw.pdf)
- Kanzlei-Kommentare: [Prometheus Recht — MiSpeL-Entwurf](https://www.prometheus-recht.de/bundesnetzagentur-mispel-speicher/) · [KPMG-Law — MiSpeL-Entwurf](https://kpmg-law.de/mispel-entwurf-neue-foerderung-fuer-energiespeicher-und-ladepunkte/)
- Industriedarstellung: [gridX — Everything you need to know about MiSpeL](https://www.gridx.ai/knowledge/everything-you-need-to-know-about-mispel) · [minimum.energy — Abgrenzungsoption und MiSpeL](https://www.minimum.energy/glossar/abgrenzungsoption-und-mispel)

---

## Cross-cutting recommendations

1. **Update `context/energy-domain.md` Z. 13** — ersetzen „20–40 % grid-fee discount" durch „bis zu 80 % Rabatt (gesetzlich), 20–40 % typisch in der Praxis für Gewerbekunden".
2. **Update `context/energy-domain.md` Z. 30** — MiSpeL-Beschreibung um „BK6-25-038; gesetzliche Frist 30.06.2026" ergänzen.
3. **Deck Slide 4** — „Schwellwert: 100 kW Differenz" streichen, durch „Mindestlastverschiebung 100 kW + Vorhersehbarkeit der Jahreshöchstlast in lastschwachen Zeiten" ersetzen (Festlegung BK4-13-739).
4. **Panel-Vorbereitung**: Falls jemand nach „BK4-19-001" fragt — diese Festlegungsnummer existiert nicht. Die relevante Nummer ist **BK4-13-739** (mit Änderungen) bzw. **BK4-24-027** für die laufende Reform der Sondernetzentgelte.

---

## Method notes / limitations

- Alle Primärtexte (§19 StromNEV, §118 EnWG) wurden direkt von gesetze-im-internet.de geprüft. BNetzA-Verfahrensseiten ebenfalls direkt abgerufen.
- Der BNetzA-Leitfaden-PDF (bonn-netz.de Mirror) ließ sich nicht via WebFetch parsen (Binärdaten). Stattdessen wurden Verbandsstellen und BNetzA-FAQ verwendet — diese decken sich inhaltlich.
- **Nicht über öffentliche Quellen verifizierbar**: ob in BK4-24-027 zwischenzeitlich ein Entwurf existiert, der die 80-%-Obergrenze ändert. Wenn das Panel danach fragt, ehrlich antworten: Verfahren läuft, finale Festlegung bis Mai 2026 nicht ergangen, alte Festlegung BK4-13-739 gilt fort. Falls maximale Sicherheit benötigt: BBH Energierechts-Desk anrufen (oder Becker-Büttner-Held München-Büro).
