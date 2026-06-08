---
id: doc-mis-9
title: /methodik Page — Trust Layer & Transparency
type: guide
tags: [transparency, trust, methodology, seo]
---

## Feature: /methodik Transparency & Methodology Page

**What changed:** Added standalone `/methodik` route (Next.js static page) with complete transparency on data sources, calculation assumptions, limitations, and author identity. Linked from home-page footer.

## Why This Matters

MiSpeL addresses a regulatory grey zone (BK6-25-038); audience (facility operators, consultants) will fact-check every claim. The `/methodik` page is the **trust layer** that makes MiSpeL credible:
- Names the author + LinkedIn (skin in the game)
- Lists all primary legal/regulatory sources
- Exposes all calculation assumptions + flags unknowns
- Explicit disclaimer (not legal advice, not official BNetzA tool)
- Reach-out mechanism for questions (free 30-min walkthrough)

## What Was Built

### File: `app/methodik/page.tsx`

Static Next.js route exporting metadata for SEO:
- **title:** "Methodik & Über dieses Tool — MiSpeL Deadline Tracker"
- **description:** "Datenquellen, Berechnungsannahmen und Autorblock… Keine Rechtsberatung."

**Layout:** 5 main sections

1. **Author block** (named + bio + disclaimer)
   - Gaylord Zach, LinkedIn link
   - "curious operator w/ deep product+eng background — keine Rechtsberatung"
   - Subtext: not a lawyer, not BNetzA staff; self-taught, errors invited

2. **Anti-promise section** (amber-highlighted warning)
   - Not legal advice
   - Not official BNetzA tool
   - Order-of-magnitude sizing only (not investment-grade)
   - Final Festlegung will override; tool updates same-day with changelog

3. **Primary sources** (6 links, each with source note)
   - BNetzA MiSpeL procedure page (BK6-25-038)
   - §85d EEG 2023 (statutory deadline)
   - §19 Abs. 3b EEG (Abgrenzungsoption)
   - §19 Abs. 3c EEG (Pauschaloption)
   - Consultation draft 18.09.2025 (basis for all assumptions)
   - §118 Abs. 6 EnWG (regulatory context)

4. **Calculation assumptions** (6 data-driven rows)
   - RLM measurement cost (Abgrenzung): 1.500–3.000 €/Year
   - Quarterly metering overhead: 500–1.200 €/Year
   - **Pauschalabschlag (EEG proceeds discount): OPEN** ← pending final Festlegung
   - **Graustrompauschale (grid supply %): OPEN** ← pending final Festlegung
   - Direct marketing revenue: user-input
   - EEG facility threshold: >0 kW + mixed load (PV + grid)
   
   Each assumption tagged as either "Annahme" (assumption, grey tag) or "noch offen" (open, amber tag). Includes source rationale for each.

5. **Reach-out CTA** (consultation hook)
   - "MiSpeL ein Blackbox? 30-Min-Walkthrough, kostenlos bis 30.06."
   - No pitch, no upsell — agency-aware framing
   - Mailto link: `gaylordzach@gmail.com?subject=MiSpeL%20Walkthrough`
   - Expiry date: 30.06.2026

### File: `app/page.tsx`

Added footer with:
```tsx
<Link href="/methodik">Methodik & Datenquellen</Link>
{' · '}
Keine Rechtsberatung · Kein offizielles BNetzA-Tool
...
kuratiert von <a href="...LinkedIn...">Gaylord Zach</a>
```

Consistent messaging across both routes.

## Design Decisions

1. **Data-driven assumptions:** `ASSUMPTIONS` array enables one-point updates when BNetzA publishes final Festlegung. No repeated strings.

2. **Open flags:** 2 assumptions explicitly marked `open: true` (Pauschalabschlag, Graustrompauschale). Rendered with amber "noch offen" badge. Critical for preventing tool misuse.

3. **Amber warning section:** `border-amber-200 bg-amber-50` makes anti-promise block visually distinct. Viewers can't miss disclaimers.

4. **SEO metadata:** Next.js `metadata` export at module level (not in getServerSideProps). Static build includes /methodik in sitemap.

5. **Source links:** All 6 primary sources are live external links (BNetzA, Gesetze-im-Internet, consultation draft). No local hosting of regulatory docs.

6. **mailto link:** Simple `href="mailto:..."` with subject pre-filled. No backend integration; low friction.

## Testing Done

- Build verification: `npm run build` → exit 0; 5/5 static pages (162 B)
- No TypeScript or ESLint errors
- Page accessible at `/methodik` from home footer

## Known Limitations & Follow-ups

1. **Two open assumptions:** Pauschalabschlag + Graustrompauschale flagged "noch offen — Festlegung ausstehend"
   - Will update `app/methodik/page.tsx` ASSUMPTIONS array once BNetzA publishes final Festlegung BK6-25-038
   - Expected before 30.06.2026
   - Changelog TBD

2. **LinkedIn URL:** `https://www.linkedin.com/in/gaylordzach/` appears in both `/methodik` and `app/page.tsx`
   - Verify both instances match before publishing (consistency across routes)

3. **Reach-out link:** Uses personal email `gaylordzach@gmail.com`
   - Deadline is 30.06.2026; after that, update CTA or disable

## How to Use This Later

**To update an assumption:** Edit `app/methodik/page.tsx`:
```tsx
const ASSUMPTIONS = [
  // ...
  {
    label: 'Pauschalabschlag auf EEG-Erlöse (Pauschaloption)',
    value: '<INSERT VALUE FROM FINAL FESTLEGUNG>',
    source: '<INSERT SOURCE/REFERENCE>',
    open: false,  // ← Set to false once locked in
  },
  // ...
]
```
Then run `npm run build` to verify and commit.

**To add a new source:** Add entry to `SOURCES` array with label, href, and note.

**To change disclaimer text:** Edit the amber section HTML in the JSX (lines 121–143).

---

## PR
- GitHub: https://github.com/cloudbeagle/mispel-deadline-tracker/pull/11
- Branch: `tasks/back-mis-9`
- Status: Ready to merge (all ACs checked)
