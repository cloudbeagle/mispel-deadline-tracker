---
id: MIS-6
title: Build Abgrenzung vs. Pauschale economic chooser
status: To Do
assignee: []
created_date: '2026-06-08 19:16'
labels: []
dependencies:
  - MIS-2
references:
  - context/initial-prd.md#5
  - context/regulatory-fact-check.md#Claim3
priority: high
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The credential core of the tool. An input form + side-by-side € comparison that tells the operator which of the two MiSpeL options (§19 Abs. 3b Abgrenzungsoption vs §19 Abs. 3c Pauschaloption) fits their asset and the approximate annual cost/revenue delta. Per PRD §5, every coefficient is labelled 'Annahme' with source. Open numbers (where the Festlegung hasn't settled the coefficient) are flagged as 'noch offen — Festlegung ausstehend'. Output is order-of-magnitude decision aid, never a binding figure. State encodable in querystring (feeds MIS-8).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Input fields: Speichergröße (kWh + kW), jährl. Netzbezug-Anteil zum Laden (%), Direktvermarktungs-Erlös p.a. (€), vorhandene Messtechnik (RLM/viertelstündlich? ja/nein)
- [ ] #2 Output: side-by-side comparison card — Abgrenzungsoption vs. Pauschaloption — showing estimated Messkosten, Erlösauswirkung, and Netto-Vorteil €/yr
- [ ] #3 Plain-language verdict line: 'Bei Ihrer Größe + [Messtechnik-Status] lohnt sich [Option] ab ca. …  €/Jahr Erlös'
- [ ] #4 Every coefficient labelled with its source or 'Annahme: [value] — Festlegung ausstehend'
- [ ] #5 Disclaimer banner: 'Dieses Tool berechnet eine Entscheidungshilfe in der Größenordnung, keine rechtsverbindliche Aussage. Finale Festlegung maßgeblich.'
- [ ] #6 Legal references §19 Abs. 3b and §19 Abs. 3c EEG visible per output line
- [ ] #7 Input state serialisable to querystring `?groesse=500&netzanteil=40&erloese=25000&messtechnik=rlm` for MIS-8
<!-- AC:END -->
