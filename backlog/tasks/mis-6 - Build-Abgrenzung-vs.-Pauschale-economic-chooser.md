---
id: MIS-6
title: Build Abgrenzung vs. Pauschale economic chooser
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:16'
updated_date: '2026-06-08 22:43'
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
**State:** Done · **Stage:** PR review fixes applied · **Next:** none

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

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Agent Recommendations
1. Run MIS-2 first (scaffold blocks everything); MIS-3 can go in parallel once repo exists
2. MIS-4, MIS-5, MIS-6, MIS-7 are the four core v0 features — can build in parallel after scaffold
3. Groom DRAFT-1 and DRAFT-2 before they enter the build queue; both need a short human decision
4. MIS-6 (chooser) is highest-effort and highest-value — budget extra time; computation assumptions need flagging not inventing
5. v0 deadline: 30.06.2026. As of 2026-06-08 that is ~22 days. Prioritise MIS-2→MIS-6 this week.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
**PR review fixes (BACK-MIS-6):**
- `components/AbgrenzungChooser.tsx:281` — fixed unhandled clipboard rejection: `navigator.clipboard?.writeText().catch(()=>{})` (guards denied permission and HTTP context where clipboard API absent)
- `lib/chooser.ts:142` — removed dead ternary in abgrenzung arm; inlined `'darüber'` (branch only entered when delta > 100, ternary always resolved to same value)
- `lib/chooser.ts:141-146` — added guard for `gruenstromAnteil === 0`: emits 'kein Grünstromanteil — Abgrenzungsoption bringt keinen Erlösvorteil' instead of misleading 'lohnt sich ab ca. 0 €'
- `HANDOFF.md` — documented composite `groesse=kWh_kW` querystring format for MIS-8 consumers

**tsc --noEmit:** clean after fixes.
<!-- SECTION:FINAL_SUMMARY:END -->

## PR
https://github.com/cloudbeagle/mispel-deadline-tracker/pull/9

## External Feedback
_PR #9_

**gzach** (review[COMMENTED], 2026-06-08T22:35:47Z):
> <!-- taskpilot-review -->
> 
> ## Code Review: MIS-6 — Abgrenzung vs. Pauschale economic chooser
> 
> ### Findings
> 
> `components/AbgrenzungChooser.tsx:281` ⚠️ **WARN — unhandled promise rejection:** `navigator.clipboard.writeText(shareUrl)` has no `.catch()`. Denied clipboard permissions throw an unhandled rejection, which logs as a runtime error in production monitoring. Fix: `navigator.clipboard?.writeText(shareUrl).catch(() => {})` (also guards the rare case where `navigator.clipboard` is undefined on HTTP).
> 
> `lib/chooser.ts:~207` ℹ️ **INFO — dead branch:** In the `empfehlung === 'abgrenzung'` arm, `delta > 0 ? 'darüber' : 'darunter'` always resolves to `'darüber'` — the branch is only entered when `delta > 100`. Remove the ternary and inline `'darüber'`.
> 
> `lib/chooser.ts:~165` ℹ️ **INFO — misleading verdict for full-grid assets:** When `netzanteilProzent = 100`, `gruenstromAnteil = 0` → `erloesFaktor = 0` → `breakEvenErloese` stays `0`. The `abgrenzung` verdict then reads *"lohnt sich ab ca. 0 €/Jahr Erlös"* for a purely grid-fed asset — misleading. Add a guard: if `erloesFaktor === 0`, skip the break-even line or emit a different message (e.g. *"kein Grünstromanteil → Abgrenzungsoption bringt keinen Erlösvorteil"*).
> 
> `lib/chooser.ts` / AC #7 ℹ️ **INFO — querystring format deviation:** AC #7 specifies `?groesse=500&netzanteil=40&erloese=25000&messtechnik=rlm` (kWh only) but implementation encodes `groesse=500_250` (kWh underscore kW). HANDOFF notes acknowledge the format. Not a runtime bug and the composite encoding is more complete; document the actual format in the task/MIS-8 handoff so consumers don't parse it wrong.
> 
> ### Summary
> 
> Implementation is clean: typed module, pure calculation, proper SSR guard via `useEffect`, input clamping, querystring round-trip. All 7 ACs satisfied in substance. One finding (clipboard rejection) should be fixed before merge.
> 
> taskpilot-review: CHANGES
<!-- SECTION:NOTES:END -->
