---
id: doc-mis-11
type: guide
title: LinkedIn Launch Post — MiSpeL Deadline Tracker
created: 2026-06-08
tags: [distribution, mispel, social, launch, companion-post]
---

# LinkedIn Launch Post — MiSpeL Deadline Tracker

## Overview

A 170-word German LinkedIn companion post ready for immediate publication at MiSpeL Deadline Tracker launch. Targets DACH energy-law + storage operators (BESS owners, Direktvermarkter, aggregators) facing the 30.06.2026 regulatory deadline.

**Location:** `content/linkedin-launch-post.md`  
**Status:** Ready to publish  
**Word count:** ~200 words (DE LinkedIn sweet spot)

## Content Structure

### Hook (AC2)
Opens with "22 Tage bis zur MiSpeL-Frist" + 30.06.2026 statutory deadline (§85d EEG 2023) + context: many BESS/Ladepunkt operators don't yet know which option suits their asset.

### MiSpeL Definition (AC3)
Two-sentence definition:
1. BNetzA procedure (Az. BK6-25-038) regulating how mixed-use storage (PV + grid charging) proves its EEG-eligible green-power share
2. Procedure still open; final ruling outstanding

### Core Decision: Abgrenzung vs. Pauschale (AC3)
One sentence contrasting the two regulatory options:
- **Abgrenzung** (§19 Abs. 3b): Quarterly metering, precise allocation, higher metering costs
- **Pauschale** (§19 Abs. 3c): Simplified calculation, lower overhead, but revenue discount

### Authority Citations (AC4)
Names three Stellungnahme-author organizations as formal-comment submitters:
- bne (Bundesverband Neue Energiewirtschaft)
- EnBW
- 1KOMMA5°

### Value Proposition
Free open-source Deadline Tracker tool answering:
- "Bin ich betroffen?" (eligibility decision tree)
- "Welche Option passt zu meinem Speicher?" (economic chooser)
- "Was kostet mich die Wahl in €?" (cost comparison)

### Domain Framing (AC6)
Explicit "Kein Energierechts-Experte" (not a legal expert); positions author as curious operator with deep product + engineering background who understands the regulation and shares the tool.

### Call to Action (AC5)
"30 Minuten kostenlose Beratung bis 30.06. — ping mich" (30 minutes free consultation until 30.06. — DM me)

## Usage

### Before Publishing
1. Update `[Link]` placeholder with live Vercel deployment URL from MIS-2 (§Deployment)
2. Schedule for mid-week, mid-morning DACH time (Tue–Thu, 08:00–10:00 MEZ)
3. Tag/mention organizations if possible:
   - bne Bundesverband Neue Energiewirtschaft
   - EnBW
   - 1KOMMA5°

### Distribution Channels
Per PRD §6:
- **Primary:** LinkedIn (highest-intent energy-law + storage crowd)
- **Secondary:** Cross-post to r/Photovoltaik + r/Speichertechnik (Reddit)
- **Tertiary:** Offer as embed to Kanzlei/consultant blogs (BBH, KPMG-Law, Prometheus)
- **Direct outreach:** Email to formal Stellungnahme-author pool (highest-intent experts)

### Refresh / Updates
Post includes HTML comment noting when to update with final Festlegung status once BNetzA ruling lands (post-30.06). The countdown becomes stale on 01.07.2026; consider archiving or updating with post-deadline pivot ("MiSpeL ist da — welche Option passt?").

## Design Rationale

### Why This Post
PRD §6 defines companion posts as distribution leverage. This post is the **high-intent regulatory translation** — it hooks the deadline urgency, anchors the two-option decision, credits domain experts, and invites operator feedback (via DM CTA). Positions the tool as a credential (domain rigor) not just a countdown.

### Word Count & Language
~170 words optimized for LinkedIn algorithm (sweet spot: 150–250 words in DE, higher engagement than longer form). German-first, plain language suitable for operators + consultants without legal training.

### Credibility Markers
- Named statutory references (§85d EEG 2023, §19 Abs. 3b/3c)
- BNetzA Az. citation (BK6-25-038)
- Formal-comment author citations (bne, EnBW, 1KOMMA5°)
- Honest framing ("curious operator", not expert claim)

## Metadata

| Field | Value |
|-------|-------|
| Source task | MIS-11 — Draft LinkedIn companion post for launch |
| Dependencies | MIS-2 (deployment URL must be live before publish) |
| Author framing | curious operator, deep product + engineering background |
| Regulatory anchors | BNetzA MiSpeL (Az. BK6-25-038), §85d EEG 2023, §19 Abs. 3b/3c EEG |
| Key contacts | bne, EnBW, 1KOMMA5° |
| Deadline | 30.06.2026 (statutory; post timely through early July) |
| PR reference | https://github.com/cloudbeagle/mispel-deadline-tracker/pull/5 |
