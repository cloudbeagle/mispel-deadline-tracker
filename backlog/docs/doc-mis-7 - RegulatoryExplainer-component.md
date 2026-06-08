---
id: doc-mis-7
title: RegulatoryExplainer Component — German Regulatory Plain-Language Guide
description: Standalone React component for MiSpeL regulatory overview and decision support
---

# RegulatoryExplainer Component

## Overview

`components/RegulatoryExplainer.tsx` is a standalone React/Tailwind component providing German-language plain-language explanations of the MiSpeL (Marktintegration von Speichern und Ladepunkten) regulatory framework.

**Location:** `components/RegulatoryExplainer.tsx`  
**Status:** Delivered, PR #10 merged (commit 47a6ca3)  
**Depends on:** None (standalone; integrates into `app/page.tsx` after MIS-4 merge)

## Content Structure

Component renders six interconnected sections in a single section element:

### 1. **Was ist MiSpeL?**
- Definition: _Marktintegration von Speichern und Ladepunkten_
- Regulatory context: BNetzA Festlegungsverfahren Az. BK6-25-038
- Legal basis: §85d EEG 2023, deadline 30.06.2026
- Scope: green/gray electricity separation for co-located BESS and charging points
- Hyperlinks: BNetzA procedure page, §85d law, Konsultationsentwurf 18.09.2025

### 2. **Wer ist betroffen?** (Who Is Affected)
- Target groups:
  - Co-located BESS + PV operators (mixed-use battery storage)
  - Charging point operators with direct EEG-source connection
  - Aggregators and direct marketers of mixed storage
- Clear non-exclusion case: standalone renewable sources without grid draw
- Default rule: automatic statutory regime if no active decision made

### 3. **Abgrenzungsoption** (Demarcation Option, §19 Abs. 3b EEG)
The precise, high-cost approach:
- **Viertelstündliche Messung** — 15-minute interval metering (RLM)
- **Formelbasierte Zuordnung** — time-point-accurate green/gray allocation via mathematical formula
- **Messkosten-Implication** — higher ongoing costs (hundreds to thousands EUR/year) offset by full EEG credit on exact green portion
- Use case: when RLM already exists or green tariff is high enough to justify meter costs

### 4. **Pauschaloption** (Standard Option, §19 Abs. 3c EEG)
The simplified, lower-cost approach:
- **Vereinfachter Pauschalansatz** — simplified calculation using annual or fixed pauschal quotas instead of interval metering
- **Minimale Messanforderung** — standard utility meters often sufficient; RLM not mandatory
- **Pauschaler Förder-/Anrechnungsschnitt** — typically results in worse EEG credit than exact demarcation (portion of actual green portion treated as gray)
- Use case: no RLM installed, small facility, low grid draw proportion where meter investment cost is unjustified

### 5. **Was dieses Tool NICHT ist** (Anti-Promise Block)
Orange callout box, explicit scope boundaries:
- ✗ Not legal advice (requires lawyer/tax advisor)
- ✗ Not an official BNetzA tool (independent author interpretation)
- ✗ Not binding numbers; orientation values based on draft as of 18.09.2025
- Note: Final BK6-25-038 ruling is authoritative

### 6. **Praxisfeedback erwünscht** (Invite-Correction CTA)
Blue callout box with exact prompt:
> "Wo vereinfache ich zu stark? Was fehlt? Sag mir, was Deine Praxis anders sieht."

- Positions author as "neugieriger Operator mit technisch-produktseitigem Hintergrund," not regulatory expert
- Explicit welcome for corrections/additions from operators, direct marketers, law firms
- Mailto link via NEXT_PUBLIC_CONTACT_EMAIL env var (fallback: gaylord.zach@s2tberlin.com)

## Technical Design

### Component Structure
- Single section wrapper with `space-y-6` (vertical spacing)
- All content sections share Tailwind card pattern: `rounded-lg border bg-card px-6 py-5`
- Nested spacing: `space-y-3` for h2/content groups, `space-y-2` for paragraph clusters

### Src Helper Component
Encapsulates external source links:
```tsx
function Src({ href, children }: { href: string; children: ReactNode })
```
- Dotted underline decoration with hover-off state
- Opens in new tab with `rel="noopener noreferrer"`
- Used for BNetzA, law text, consultation draft URLs

### Source URL Constants
All hyperlinks hardcoded at module top:
- `BNETZA_URL` — BNetzA MiSpeL procedure page
- `EEG_85D_URL` — §85d EEG 2023 (gesetze-im-internet.de)
- `EEG_19_URL` — §19 Abs. 3b/3c EEG (gesetze-im-internet.de)
- `KONSULTATION_URL` — 18.09.2025 draft consultation via BNetzA

### Contact Configuration
- `CONTACT_EMAIL` reads `NEXT_PUBLIC_CONTACT_EMAIL` env var with fallback
- Pattern allows deployment-time email update without code change
- Mailto link in blue CTA button

### Special Styling
- Orange callout: `border-orange-200 bg-orange-50` (anti-promise block)
- Blue callout: `border-blue-200 bg-blue-50` (feedback CTA) with button
- Text emphasis: `text-foreground` for key terms in default sections
- Accessibility: `text-muted-foreground` for secondary content

## Dependencies & Integration

**Runtime:** React 18+, Tailwind CSS 4+ (card and utilities tokens)  
**No external libraries** beyond standard Next.js setup

**Integration Point (pending MIS-4 merge):**
Add to `app/page.tsx` below `<WhatHappensExplainer />`:
```tsx
<RegulatoryExplainer />
```

## Key Design Decisions

1. **Standalone component, no state** — renders fixed content structure; no interactivity or decision tree (that is MIS-5)
2. **All hyperlinks sourced to legal texts** — implements "every factual claim links to primary source" requirement (AC #4)
3. **Anti-promise block explicit and styled** — orange callout distinguishes disclaimers from explanatory content, builds trust (aligns with [[Anti-Promise & Scope Framing]] pattern)
4. **Pauschal descriptions focus on metering/cost, not solar specifics** — MiSpeL applies equally to co-located PV and grid-connected BESS; emphasis on measurement approach and cost implications
5. **Contact email via env var** — operationalizes feedback loop; allows launch-time config without code change

## PR Review & Fixes (Commit 47a6ca3)

**Original PR #10** had three review findings:

| Finding | Severity | Fix |
|---------|----------|-----|
| `React.ReactNode` without import | 🔴 blocking | Changed to `import type { ReactNode } from 'react'` |
| Hardcoded contact email | 🟡 style | Made `NEXT_PUBLIC_CONTACT_EMAIL` env var with fallback |
| `HANDOFF.md` in git | 🟡 style | Excluded from repo via `.gitignore`, agent artifact cleanup |

All fixes merged; component ready for use.

## Usage & Testing Notes

- Component renders six vertical sections; total height ~1200px (depends on viewport and breakpoints)
- All `<Src>` links tested for accessibility: underline decoration remains visible at all states
- Feedback button uses mailto protocol; behavior depends on recipient email client on user device
- §19 Abs. 3b/3c EEG links resolve correctly to gesetze-im-internet.de structure (both subsections on same page)
- Konsultationsentwurf URL points to BNetzA article listing, which embeds draft PDF

## Future Updates

- **After 30.06.2026:** Swap consultation draft links to final BK6-25-038 ruling document
- **Version 2:** Consider integration with decision-tree component (MIS-5) to show "which option for my case?"
- **Content review:** Invite-correction CTA solicits operator feedback; collect and incorporate improvements in next release

---

**Narrated:** 2026-06-09  
**Baseline:** Final Summary + commit 47a6ca3 + knowledge/INDEX.md at session start
