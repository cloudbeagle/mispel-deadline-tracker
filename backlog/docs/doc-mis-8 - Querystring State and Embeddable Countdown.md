---
id: doc-mis-8
title: Querystring State and Embeddable Countdown
type: guide
tags: [state-management, distribution, embed, shareable-links]
---

## Overview

MIS-8 implements two distribution mechanics for the MiSpeL Deadline Tracker (PRD §6):

1. **Querystring state** — decision tree and chooser inputs encoded in the URL so any form state is shareable as a link
2. **Embeddable countdown** — a `/embed/countdown` route for iframe embedding on Kanzlei/blog sites with a "Copy embed" button

## Architecture

### URL State Management

Both `BinIchBetroffen` (decision tree) and `AbgrenzungChooser` (economic calculator) participate in querystring state. They operate independently but preserve each other's params to allow user flows like:

1. User answers decision tree questions → querystring updates with tree params (`mixed`, `eeg`, `netz`, `lp`)
2. User scrolls to economic chooser → if triggered by tree results (red verdict), they enter chooser with tree params already preserved
3. User adjusts economic inputs → querystring updates chooser params while tree params remain intact

#### BinIchBetroffen (Decision Tree)

- **Params:** `mixed`, `eeg`, `netz`, `lp` (each `"true"` or `"false"`)
- **Hydration:** On mount, reads `window.location.search` and reconstructs form state via `paramsToState()`
- **Update flow:** User answers question → `setState()` → calls `replaceTreeState()` which:
  1. Merges tree params into current querystring (deletes old tree params, adds new ones)
  2. Preserves any chooser params (`groesse`, `netzanteil`, `erloese`, `messtechnik`)
  3. Calls `window.history.replaceState()` to update URL without page reload
- **Documented at:** Lines 4–12 in component

#### AbgrenzungChooser (Economic Chooser)

- **Params:** `groesse` (e.g., `"500_250"`), `netzanteil` (0–100), `erloese` (€ p.a.), `messtechnik` (`"rlm"` or `"keine"`)
- **Hydration:** On mount, reads `window.location.search`, parses with `parseQueryString()`, merges with defaults
- **Update flow:** User changes input → `setInputs()` → recompute result → update querystring (same merge pattern as tree)
- **Documented at:** Lines 4–12 in component

#### Key Design: Param Merge Pattern

Both components use the same merge strategy to coexist safely:

```javascript
// When component X updates, preserve all other params:
const merged = new URLSearchParams(window.location.search);
xKeys.forEach(k => merged.delete(k));        // Clear component X's old params
newParams.forEach((v, k) => merged.set(k, v)); // Add new params from component X
window.history.replaceState({}, '', newUrl); // Push to URL
```

This ensures users can:
- Answer tree questions, get a result, then compare economic options without losing their tree state
- Bookmark/share URLs at any point in the form with full state included
- Share URLs with others — recipient lands with the form pre-filled

### Share Buttons

`ShareBar.tsx` provides two buttons positioned after the countdown card in `app/page.tsx`:

#### "Link teilen" Button
- Copies `window.location.href` (full URL including all querystring params)
- User receives feedback: "Kopiert!" + checkmark for 2 seconds
- Useful for sharing form state via email, messaging, etc.

#### "Einbetten" Button
- Copies a one-line iframe snippet: `<iframe src="[origin]/embed/countdown" width="400" height="120" frameborder="0" ...>`
- User can paste directly into blog posts or Kanzlei websites
- Useful for partners who want to show the deadline countdown on their own sites

### Embeddable Countdown Route

`app/embed/countdown/page.tsx` renders a minimal countdown widget designed for 400×120px iframe embedding:

- **No navigation chrome** — no header, footer, or sidebar; inline styles only
- **Display:** Days remaining + label ("Tage bis 30.06.2026, 23:59 MEZ" or "Frist abgelaufen")
- **Update frequency:** Every 60 seconds (60_000ms interval)
- **Post-deadline:** Shows "0" days and label "Frist abgelaufen — ab 01.07.2026 in Kraft"
- **Graceful degradation:** Before first render, shows "—" as placeholder
- **Embedded link:** Footer includes "mispel-deadline-tracker.vercel.app" link so viewers can navigate to full tool

#### CSP Configuration

`next.config.ts` adds iframe-friendly headers for `/embed/*` routes:

```javascript
source: '/embed/:path*',
headers: [
  { key: 'Content-Security-Policy', value: "frame-ancestors *" },
],
```

This allows the widget to be embedded in any third-party site (Kanzlei blogs, partner dashboards) without CSP frame restrictions.

## Usage

### For Users

1. **Share a form state:** Answer questions in "Bin ich betroffen?" or adjust inputs in "Abgrenzung vs. Pauschale", then click "Link teilen" to copy the URL. Share with others.
2. **Embed the countdown:** On a partner site or blog, click "Einbetten" to copy the iframe snippet, paste into HTML.

### For Developers

#### Extending Querystring Params

If a new input component is added (e.g., a regulatory-news filter):

1. Define param names and their serialization format in a comment block at the top of the component
2. Implement hydration on mount: `useEffect(() => { setState(parseParams(window.location.search)); }, [])`
3. On input change, merge new params with existing querystring:
   ```javascript
   const merged = new URLSearchParams(window.location.search);
   newComponentKeys.forEach(k => merged.delete(k));
   newParams.forEach((v, k) => merged.set(k, v));
   window.history.replaceState({}, '', newUrl);
   ```

#### Testing Embeddable Routes

Test the embed route locally at `http://localhost:3000/embed/countdown` or embed it in an iframe:

```html
<iframe src="http://localhost:3000/embed/countdown" width="400" height="120" frameborder="0" style="border:none;overflow:hidden" allowtransparency="true" title="Countdown"></iframe>
```

Verify:
- Layout fits 400×120px without overflow
- Countdown updates every minute (browser console should show no errors)
- After 2026-06-30 23:59 UTC, shows "0" and deadline-passed label

## Files Modified

- `components/BinIchBetroffen.tsx` — Added URL state management, param documentation
- `components/AbgrenzungChooser.tsx` — Added URL state merge logic, param documentation
- `components/ShareBar.tsx` — **New** share button component
- `app/page.tsx` — Imported and rendered `ShareBar` after countdown hero
- `app/embed/countdown/page.tsx` — **New** embeddable countdown route
- `next.config.ts` — Added CSP headers for `/embed/*` routes

## Related

- [[querystring-state-pattern]] — Pattern for multi-component URL state
- [[embed-design-csp]] — CSP configuration for iframe-embeddable routes
