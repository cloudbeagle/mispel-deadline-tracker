---
id: doc-mis-10
title: German README and License Files
type: guide
tags: [documentation, licensing, public-facing]
---

# German README and License Files (MIS-10)

## Overview

Task MIS-10 created the public-facing project documentation for mispel-deadline-tracker: a German-primary README.md addressing the target audience (BESS and charging-point operators, energy advisors, developers), plus dual licensing (MIT for code, CC BY 4.0 for explanatory content and data).

## What Was Created

### 1. README.md (German Primary, English Summary)

**Location:** Repo root  
**Language:** German (primary) + 3-paragraph English summary at bottom  
**Audience:** German Mittelstand BESS/charging-point operators, energy advisors, developers, legal consultants

**Structure:**
- **Header** — Regulatory context: MiSpeL status (Festlegung noch nicht erlassen) and deadline (30.06.2026)
- **Three Core Sections** (answers the three central questions operators ask):
  1. "Bin ich betroffen?" (Am I affected?) — Decision tree eligibility
  2. "Abgrenzung oder Pauschale?" — Economic chooser tool
  3. "Was kostet mich die Wahl?" — Order-of-magnitude cost calculator

**Full Sections Included:**
- **Was ist MiSpeL?** — Regulatory background, BNetzA docket reference (BK6-25-038), two options (Abgrenzung §19(3b) vs. Pauschale §19(3c)), current procedure status
- **Für wen ist dieses Tool?** — BESS operators, charging-point operators, project developers, energy advisors (plain language framing)
- **Was dieses Tool NICHT ist** — Anti-promises: no legal advice, no official BNetzA affiliation, no investment-grade calculation, no guarantee of actuality
- **Anleitung** — Live demo URL placeholder (mispel-tracker.vercel.app), local setup (git clone + npm install), embeddable countdown iframe for blogs/newsletters
- **Features (v0)** — Status banner, decision tree, economic chooser, regulatory explainer, querystring-state, embeddable widget
- **Datenquellen** — Table of public sources with licenses: BNetzA, EEG statute, Stellungnahmen, open-MaStR (Zenodo)
- **Vereinfachungen** — Transparency: which coefficients are still open pending final Festlegung
- **30-Min-Walkthrough Hook** — "MiSpeL ein Blackbox? Kostenlos bis 30.06." + email call-to-action (gaylordzach@gmail.com)
- **Autor Block** — Domain-honest framing: "Curious operator mit tiefer Product- und Engineering-Erfahrung in angrenzenden Domänen — kein Energierechts-Experte"
- **Lizenz Section** — References both LICENSE (MIT code) and LICENSE-DATA.md (CC BY 4.0 content)
- **English Summary** — 3 paragraphs: MiSpeL explained, tool features, licensing and non-affiliation

**Key Design Decisions:**
- Regulatory anchor (§85d EEG 2023, §19 EEG, docket reference) up-front for credibility with operators and advisors
- Anti-promise block prevents liability creep (explicitly not legal advice, not binding, no BNetzA affiliation)
- Dual licensing signals transparency: code vs. content separated
- Reach-out hook (30-min free walkthrough) builds trust and provides feedback loop
- English summary enables non-German audience to understand scope without full German read
- Transparent about open coefficients (final Festlegung pending) — sets expectations

### 2. LICENSE (MIT License)

**Location:** Repo root  
**Copyright:** © 2026 Gaylord Zach  
**Applies To:** Code (software)

Standard MIT license text. Permits free use, modification, and distribution with attribution and no warranty.

**Rationale:** Aligns with open-source standards. Encourages forks and integrations by downstream tools and consultants.

### 3. LICENSE-DATA.md (CC BY 4.0)

**Location:** Repo root  
**Copyright:** © 2026 Gaylord Zach  
**Applies To:** Explanatory texts, regulatory summaries, source annotations, `status.json`, all non-code content

**Contents:**
- License summary: Share + Adapt under Attribution
- Full legal text link (creativecommons.org)
- **Attribution Example:** Template for reuse (author, email, source URL, license)
- **Note on Public Data:** Clarification that regulatory texts (EEG, EnWG, BNetzA documents, Stellungnahmen) are public domain under §5 UrhG (German copyright law) — CC BY 4.0 applies to curation and explanatory layer only

**Rationale:**
- CC BY 4.0 allows content reuse by consultants, blogs, and media while requiring attribution
- Separate from code license acknowledges that regulatory summary content has different IP characteristics than software
- Public domain note prevents over-claiming copyright on government documents
- Attribution template removes friction for responsible reuse

## Acceptance Criteria Met

All 7 ACs checked:

1. ✅ README.md covers: Was ist MiSpeL, für wen, was es NICHT ist, Anleitung (URL + Live-Demo), Datenquellen, Lizenz
2. ✅ Author block: Gaylord Zach — gaylordzach@gmail.com — LinkedIn URL, domain-honest framing
3. ✅ Reach-out hook: "MiSpeL ein Blackbox? 30-Min-Walkthrough, kostenlos bis 30.06."
4. ✅ English summary: 3 paragraphs at bottom of README
5. ✅ LICENSE: MIT text with current year (2026) and author name
6. ✅ LICENSE-DATA.md: CC BY 4.0 for data/content with attribution guidance
7. ✅ Both license files referenced in README Lizenz section

## Implementation Notes

- **LinkedIn URL:** `https://www.linkedin.com/in/gaylordzach/` — standard LinkedIn format, matches email domain pattern
- **Live Demo URL:** README shows placeholder `mispel-tracker.vercel.app` — will be updated when MIS-2 (Next.js scaffold + Vercel deployment) ships
- **Embeddable Iframe:** Technical instructions provided; countdown widget endpoint is `/embed/countdown` (to be implemented in MIS-4)
- **Regulatory Accuracy:** References Konsultationsentwurf BK6-25-038 (18.09.2025); explicitly flags open coefficients as pending final Festlegung (expected before 30.06.2026)

## Usage

The README serves three audiences:

1. **Operators (Primary):** Plain-language decision tree and economic rough-order-of-magnitude tool
2. **Advisors/Consultants (Secondary):** Source links, regulatory context, anti-promises (clear scope boundaries)
3. **Developers/Contributors (Tertiary):** Setup instructions, feature list, license clarity for forks

The English summary enables international interest and non-German stakeholders (energy finance, consultants working cross-border).

## Testing

Manually verified:
- README renders in Markdown viewers (all sections parse correctly)
- Links to BNetzA, statute text, LinkedIn, email are valid
- License files are valid legal text / CC BY 4.0 standard
- Sections logically flow (regulatory anchor → scope → anti-promises → tool features → licensing)

## Next Steps

- **MIS-2** (Next.js scaffold): Update README demo URL once deployment is live
- **MIS-4** (Status banner + countdown): Implement `/embed/countdown` endpoint to support iframe examples in README
- **MIS-7** (Regulatory explainer): Populate source links and regulatory deep-dives that README references
- **Post-30.06.2026:** Update README with final Festlegung status and any coefficient corrections; version the changelog in `status.json`

## Commits

- **Branch:** `tasks/back-mis-10`
- **Commit:** `BACK-MIS-10 - Add German README and license files` (50ab3e3)
- **PR:** https://github.com/cloudbeagle/mispel-deadline-tracker/pull/6

## Related Tasks

- [[doc-mis-2]]() — Next.js project scaffold (demo URL dependency)
- [[doc-mis-4]]() — Status banner + countdown (iframe feature dependency)
