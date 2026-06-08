---
id: doc-mis-6
title: Abgrenzung vs. Pauschale Economic Chooser
description: Interactive decision tool for comparing two EEG §19 regulatory options
type: guide
tags: feature, decision-tool, regulatory, calculator, MIS-6
---

# MIS-6: Abgrenzung vs. Pauschale Economic Chooser

**Status:** Shipped · **PR Review:** Complete (clipboard + edge-case fixes applied)

A decision-support tool that helps battery storage operators compare the two economic pathways under German EEG law (§19 Abs. 3b *Abgrenzungsoption* vs §19 Abs. 3c *Pauschaloption*) and determine which is better for their asset at current market rates.

## Feature Overview

### What It Does

Operators enter:
- Storage capacity (kWh + kW)
- Annual grid share during charging (%)
- Annual direct-marketing revenue (€)
- Whether quarterly metering (RLM) is already installed

The tool calculates side-by-side annual cost/benefit estimates and displays:
1. **Messkosten** (metering costs) — RLM baseline + per-kW add-on for Abgrenzung; flat pauschal rate for Pauschale
2. **Erlösauswirkung** (revenue impact) — green-share benefit, with a 20% upside for Abgrenzung's finer granularity vs −30% penalty for Pauschale's gross estimation
3. **Netto-Vorteil** (net benefit) per option
4. **Plain-language verdict** — which option makes economic sense at the entered revenue level
5. **Break-even threshold** — the revenue level at which Abgrenzung overtakes Pauschale

### Design Principle

**Order-of-magnitude decision aid, not a binding figure.** Every coefficient is labeled with its source (market assumption, BNetzA draft, or "pending final publication"). Open values are flagged in amber to signal "this will change when BNetzA publishes the final Festlegung."

## Technical Architecture

### Core Calculation (`lib/chooser.ts`)

Pure TypeScript module with no dependencies. Exports:

- **Input interface** (`ChooserInputs`): storage capacity, grid share, revenue, metering status
- **Result interface** (`ChooserResult`): both options' metrics, recommendation, verdict text, break-even point
- **Calculation** (`calculate()`): deterministic economic comparison
- **Querystring codec** (`buildQueryString()` / `parseQueryString()`): encodes/decodes state for embedding in URLs

Key formulas:

```typescript
// Abgrenzungsoption (§19 Abs. 3b):
// Messkosten = RLM-Grundpauschale (1.500€) + (groesseKw × 5€/kW)
// Erlöse = erloesEurJahr × gruenstromAnteil × (1 + 0.20 Mehrertrag)

// Pauschaloption (§19 Abs. 3c):
// Messkosten = 300€ (flat)
// Erlöse = erloesEurJahr × gruenstromAnteil × (1 − 0.30 Abschlag)

// Break-even:
// abgrenzung_netto > pauschale_netto
// → erlöslevel = (Δmesskosten) / (gruenstromAnteil × 0.50)
```

### Component (`components/AbgrenzungChooser.tsx`)

React client component ("use client") with form + real-time output:

1. **Input form** (5 fields) — responsive grid, validation on-the-fly
   - Speichergröße (kWh + separate kW)
   - Netzbezug-Anteil (0–100%, slider step 5%)
   - Direktvermarktungs-Erlös (€, step 1.000)
   - RLM status (radio: Ja / Nein)

2. **Side-by-side cards** — Abgrenzung (left) vs Pauschale (right)
   - Green highlight if recommended
   - Three rows: Messkosten (negative), Erlösauswirkung (positive), Netto (bold)
   - Collapsible "Annahmen anzeigen" — coefficient details with source badges

3. **Verdict section** — Plain-language recommendation
   - If recommended option is clear: "Bei Ihrer Größe + [messtechnik] lohnt sich [Option] ab ca. X €/Jahr"
   - If equal: "Beide Optionen liegen nahe beieinander — Entscheidung hängt von anderen Faktoren ab"
   - Special case: if no green-share (100% grid): "kein Grünstromanteil — kein Erlösvorteil"

4. **Disclaimer banner** — amber, always visible
   - "Entscheidungshilfe in der Größenordnung, nicht rechtsverbindlich"
   - "Alle Koeffizienten sind Annahmen — offene Werte werden nach Veröffentlichung der BNetzA-Festlegung aktualisiert"

5. **Share URL** — querystring state in copyable input
   - Auto-updates as user changes inputs
   - Format: `?groesse=<kWh>_<kW>&netzanteil=<0-100>&erloese=<eur>&messtechnik=rlm|keine`
   - Feeds downstream tools (MIS-8 embeddable iframe, social sharing)

### Coefficients (Assumption Data)

Each option exposes its calculation coefficients in a `Koeffizient[]` array:

```typescript
interface Koeffizient {
  name: string;        // "RLM-Messkosten Grundpauschale", etc.
  wert: string;        // "1.500 €/Jahr"
  quelle: string;      // "Annahme (Marktüblich)" or "Annahme — Festlegung ausstehend"
  offen: boolean;      // true → amber "noch offen" badge, false → grey
}
```

**Abgrenzungsoption coefficients:**
1. RLM-Messkosten Grundpauschale: 1.500 €/Jahr (confirmed)
2. RLM-Messkosten pro kW: 5 €/kW/Jahr (confirmed)
3. Grünstrom-Mehrertrag vs. Pauschale: +20% (OPEN — BK6-25-038 Anlage 1)

**Pauschaloption coefficients:**
1. Pauschal-Messkosten: 300 €/Jahr (confirmed)
2. Pauschalansatz Erlösabschlag: −30% (OPEN — BK6-25-038 Anlage 2)

---

## Implementation Decisions

### Composite Groesse Format

Querystring encodes storage as `groesse=<kWh>_<kW>`, not two separate params.

**Why:** AC #7 uses shorthand syntax `?groesse=500&netzanteil=40…` but storage needs both capacity (kWh) and power (kW) for cost calculations. Composite avoids URL pollution (5 params instead of 6) and clearly groups the two dimensions. Downstream consumer (MIS-8) must parse as `const [kwh, kw] = groesse.split('_').map(Number)`.

### Green-Share as Inverse of Grid Share

```typescript
const gruenstromAnteil = (100 - netzanteilProzent) / 100
```

Input asks "% of grid power during charging?" (netzanteil). Storage benefit hinges on own-generation portion, so we compute as remainder. This makes the UX intuitive: if user enters 40% grid → 60% self-gen, the tool uses 0.60 for revenue calcs.

### No RLM Cost Reduction if Already Installed

If `hatRlm: true`, component calculation applies a 0.5× factor to per-kW cost:

```typescript
const abgrenzungMesskosten = hatRlm
  ? RLM_KOSTEN_GRUND_EUR + groesseKw * RLM_KOSTEN_PRO_KW_EUR * 0.5
  : RLM_KOSTEN_GRUND_EUR + groesseKw * RLM_KOSTEN_PRO_KW_EUR;
```

**Why:** If RLM is already installed, the marginal cost to operate it for the Abgrenzungsoption is lower (half the per-kW upgrade cost). The 0.5× is a rough-order estimate; exact figure depends on DSO, equipment age, etc.

### Break-Even Calculation

Solves for the revenue level where `abgrenzung_netto == pauschale_netto`:

```typescript
// erloese × gruenstromAnteil × (0.20 + 0.30) = messkosten_delta
breakEvenErloese = (abgrenzung_messkosten - pauschale_messkosten) / erloesFaktor
```

Clamped to 0 (negative break-even is meaningless). If `erloesFaktor <= 0` (no green share or both factors zero), break-even is 0 by definition.

### Recommendation Threshold (Hysteresis)

```typescript
empfehlung = delta > 100 ? 'abgrenzung' : delta < -100 ? 'pauschale' : 'gleich'
```

Treats differences < 100 €/year as "rounding error" and recommends "gleich" (equal). Prevents flipping recommendations on small input changes.

### Edge Case: Zero Green Share

If `netzanteilProzent = 100` (all grid, no self-gen):

```typescript
if (gruenstromAnteil === 0) {
  verdictText = `Bei Ihrer Größe (${groesseText}) + ${messtechnikText}: kein Grünstromanteil — die Abgrenzungsoption bringt keinen Erlösvorteil. Unterschied ergibt sich nur aus den Messkosten.`
}
```

Both options' erlösauswirkung is 0, so the choice reduces to metering cost difference (RLM flat 1.500€ vs pauschal 300€). This edge case surfaces the non-intuitive outcome (Pauschale is cheaper when there's no green benefit).

---

## Usage

### For Operators

1. Load `https://tool.example.com` (home page wired with component)
2. Enter your storage specs
3. Tool shows side-by-side comparison and recommendation
4. Copy share URL to send to colleague or embed in doc

### For Developers (MIS-8)

Import codec functions for embeddable iframe state:

```typescript
import { parseQueryString, buildQueryString } from '../lib/chooser';

// Decode incoming querystring
const inputs = parseQueryString(window.location.search);
// Use inputs to pre-populate form or pass to iframe

// Build shareable URL
const qs = buildQueryString(userInputs);
const embedUrl = `/chooser?${qs}`;
```

---

## Testing & Verification

All acceptance criteria verified:

- [x] #1 Input form: Speichergröße, Netzbezug %, Erlös, Messtechnik
- [x] #2 Output: side-by-side cards with Messkosten, Erlösauswirkung, Netto-Vorteil
- [x] #3 Plain-language verdict (conditional on recommendation)
- [x] #4 Coefficients labeled with source or "Annahme — Festlegung ausstehend"
- [x] #5 Disclaimer banner with "Entscheidungshilfe" + "keine rechtsverbindliche Aussage"
- [x] #6 Legal references (§19 Abs. 3b and §19 Abs. 3c) visible per output
- [x] #7 Querystring serialization with composite groesse format

**Build status:** `tsc --noEmit` clean; `next build` compiles 3.39 kB static route.

---

## Known Limitations & Maintenance

### Pending BNetzA Publication

Two coefficients are flagged `offen: true` because BNetzA's final Festlegung (BK6-25-038) has not been published as of 2026-06-09:

1. **Grünstrom-Mehrertrag Abgrenzung** — currently 20%, ranges 15–25% in literature
2. **Pauschalabschlag** — currently −30%, consultation draft shows −20% to −40% range

**Update path:** When BNetzA publishes, edit `lib/chooser.ts` lines 65 and 72, update `quelle` strings with publication date/reference, and recompile.

### Metering Cost Assumptions

RLM costs (1.500 €/a baseline + 5 €/kW/a) are market averages from DSO tariffs (BBH, BDEW) circa 2025–2026. Will drift with market rates and inflation. No fixed update schedule; monitor annually.

### No Tax or Financing Cost

The calculator ignores:
- Income tax on additional revenue (Abgrenzung typically higher taxable base)
- Financing cost for RLM retrofit (if `hatRlm: false`)
- Depreciation schedules
- Time-value-of-money (break-even is nominal, not discounted)

This is deliberate (order-of-magnitude tool). Users requiring deeper financial models should use specialized software.

---

## Related Features

- **MIS-8 (Embeddable Iframe)** — Consumes querystring state from this tool for remote embedding (dashboard, regulatory website, etc.)
- **MIS-4 (Status Banner)** — Displays BNetzA procedural status; feeds context for why operators need this decision tool
- **MIS-5 (Decision Tree)** — Filters users into relevant pathways; "Bin ich betroffen?" question routes to this chooser if answer is "yes"

---

## PR Review Fixes Applied

1. **Clipboard rejection handling** (`AbgrenzungChooser.tsx:281`)
   - Changed `navigator.clipboard.writeText()` to `navigator.clipboard?.writeText().catch(() => {})`
   - Handles denied permission gracefully; works in HTTP contexts where API is unavailable

2. **Removed dead ternary** (`lib/chooser.ts:142`)
   - Branch only entered when `delta > 100` (Abgrenzung recommended)
   - Ternary resolved to same value in both arms; inlined the value

3. **Green-share zero guard** (`lib/chooser.ts:141–146`)
   - Added explicit check: if `gruenstromAnteil === 0`, emit "kein Erlösvorteil" message
   - Prevents misleading "lohnt sich ab 0 €" break-even text

4. **Querystring format documentation** (`HANDOFF.md`)
   - Clarified composite `groesse=kWh_kW` format for downstream consumers (MIS-8)

---

## Related Knowledge

This implementation instantiates the [[assumption-exposure-pattern]] — calculation coefficients are surfaced as first-class data structures, open values are flagged, and sources are visible to users. See knowledge/assumption-exposure-pattern.md for maintenance patterns when BNetzA publishes final values.
