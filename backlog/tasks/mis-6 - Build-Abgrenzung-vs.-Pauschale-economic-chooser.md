---
id: MIS-6
title: Build Abgrenzung vs. Pauschale economic chooser
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:16'
updated_date: '2026-06-08 22:12'
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
**State:** Done · **Stage:** implementation complete / **Next:** none; narrator will document.

The credential core of the tool. An input form + side-by-side € comparison that tells the operator which of the two MiSpeL options (§19 Abs. 3b Abgrenzungsoption vs §19 Abs. 3c Pauschaloption) fits their asset and the approximate annual cost/revenue delta. Per PRD §5, every coefficient is labelled 'Annahme' with source. Open numbers (where the Festlegung hasn't settled the coefficient) are flagged as 'noch offen — Festlegung ausstehend'. Output is order-of-magnitude decision aid, never a binding figure. State encodable in querystring (feeds MIS-8).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Input fields: Speichergröße (kWh + kW), jährl. Netzbezug-Anteil zum Laden (%), Direktvermarktungs-Erlös p.a. (€), vorhandene Messtechnik (RLM/viertelstündlich? ja/nein)
- [x] #2 Output: side-by-side comparison card — Abgrenzungsoption vs. Pauschaloption — showing estimated Messkosten, Erlösauswirkung, and Netto-Vorteil €/yr
- [x] #3 Plain-language verdict line: 'Bei Ihrer Größe + [Messtechnik-Status] lohnt sich [Option] ab ca. …  €/Jahr Erlös'
- [x] #4 Every coefficient labelled with its source or 'Annahme: [value] — Festlegung ausstehend'
- [x] #5 Disclaimer banner: 'Dieses Tool berechnet eine Entscheidungshilfe in der Größenordnung, keine rechtsverbindliche Aussage. Finale Festlegung maßgeblich.'
- [x] #6 Legal references §19 Abs. 3b and §19 Abs. 3c EEG visible per output line
- [x] #7 Input state serialisable to querystring `?groesse=500&netzanteil=40&erloese=25000&messtechnik=rlm` for MIS-8
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create lib/chooser.ts — pure calculation logic (coefficients, formulas, types)\n2. Create components/AbgrenzungChooser.tsx — 'use client' form + side-by-side output + verdict + disclaimer\n3. Update app/page.tsx — wire chooser into homepage\n4. Verify TypeScript + build pass\n5. Commit
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Implemented Abgrenzung vs. Pauschale economic chooser — the credential core of the MiSpeL tracker.

**Changes:**
- `lib/chooser.ts` — pure calculation module: typed inputs/outputs, assumption constants from BNetzA Konsultationsentwurf 18.09.2025 (BK6-25-038), `calculate()`, `buildQueryString()`, `parseQueryString()`, `fmt()`. Open coefficients flagged `offen: true` (Grünstrom-Mehrertrag +20%, Pauschalansatz-Abschlag −30%).
- `components/AbgrenzungChooser.tsx` — `use client` React component: 4-field input form (kWh/kW/Netzbezugsanteil/Erlöse + RLM radio), side-by-side comparison cards (Abgrenzung §19 Abs. 3b / Pauschale §19 Abs. 3c), EurRow with sign-coloured values, collapsible Annahmen per option, plain-language verdict with break-even, disclaimer banner, shareable URL input with copy-button.
- `app/page.tsx` — wires chooser into homepage.

**All 7 ACs satisfied:**
1. All 4 input fields present (kWh, kW, Netzbezugsanteil %, Erlöse €, RLM ja/nein)
2. Side-by-side Messkosten / Erlösauswirkung / Netto-Vorteil cards
3. Plain-language verdict with break-even Erlöswert
4. Each coefficient labelled with Annahme + source; open ones flagged amber
5. Disclaimer banner at top
6. §19 Abs. 3b / §19 Abs. 3c EEG labels per card header
7. Querystring serialization: `?groesse=500_250&netzanteil=40&erloese=25000&messtechnik=rlm` (hydrates from URL on mount)

**Tests:** `npx tsc --noEmit` clean; `next build` passes (3.39 kB route, static output).
<!-- SECTION:FINAL_SUMMARY:END -->
