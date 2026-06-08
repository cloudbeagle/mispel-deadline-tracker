---
type: prd
project: mispel-deadline-tracker
backlog_task: 
status: approved
created: 2026-06-08
---

# PRD — MiSpeL Deadline & Decision Tracker

> One-line: a live status tracker + plain-language decision tool for German BESS / charging-point operators facing the BNetzA **MiSpeL** Festlegung (deadline 30.06.2026) — answers "bin ich betroffen?", "Abgrenzung oder Pauschale?", and "was kostet mich die Wahl?".

## 0. What changed vs the handoff spec (builder note)

The handoff (`cleantech-credentials-handoff.md` §Project-2) scoped a Streamlit **submission-template generator** producing "prefilled BNetzA XML/PDF". That is wrong-premature: as of 2026-06-08 **no final Festlegung exists** (BNetzA last updated the Verfahren page 12.11.2025; the §85d-EEG deadline of 30.06.2026 has not yet been met). There is no submission portal or official template to prefill, and there may never be a single XML schema — MiSpeL is a *metering/allocation rule*, not a filing.

Builder reframe: ship a **decision + live-status tracker**, not a form generator. The valuable thing for an operator in the 22 days before the deadline (and the months after Inkrafttreten) is: *am I in scope, which of the two options fits my asset, and what does each cost me?* That also makes a far stronger credential — it forces command of the actual Graustrom/Grünstrom separation mechanic instead of a countdown clock.

## 1. Problem & audience

- **Who** (DACH): operators of **Mixed-Use / Co-Location battery storage** (PV + Netzstrom charging) and **Ladepunkt-Betreiber** — BESS owners, project developers, aggregators/Direktvermarkter, PV-park operators adding storage. Secondary: the energy-law / consultancy crowd who advise them.
- **Pain today**: the rule that decides whether mixed-charged storage keeps EEG-Förderfähigkeit is **still in flux 22 days before its legal deadline**, split into two options (Abgrenzung vs Pauschale) with materially different metering cost and revenue consequences. BDEW + VKU publicly call the draft impractical. Operators get this today only from scattered Kanzlei-blogs (BBH, KPMG-Law, Prometheus) and the raw BNetzA Konsultationsentwurf — no tool tells them *which option fits my asset and what it costs*.
- **Why now**: hard **30.06.2026** statutory deadline (§85d EEG 2023), Inkrafttreten ≤01.07.2026. Peak search/attention window is *now through July*. Time-decay is the whole point — this is a build-this-month-or-never tool.

## 2. Strategic fit (the ladder)

- **Primary goal**: thesis-validation (25% weight but the real driver here) + credential. It is a working v0 of the **Rung-2 compliance-copilot** thesis (`venture-research-output.md` #2) — "translate a moving BNetzA Festlegung into an operator decision." If operators engage / ask for help, that validates Regulatory-as-a-Service demand.
- **Venture thesis it prototypes**: Mittelstand compliance copilot (regulatory translation → action). MiSpeL is a clean, bounded, time-stamped test case.
- **Cross-project leverage**: establishes the **deploy + OG-card + Plausible + methodology-page plumbing** reused by every later tool (this is the pipeline-builder role we pulled off §19). Also seeds a reusable "regulatory-deadline-tracker" template (could re-skin for BK4-24-027, AgNES, §14a).

## 3. Regulatory / data anchor

- **Primary sources** (all verified in `context/regulatory-fact-check.md` Claim 3):
  - BNetzA Festlegungsverfahren **MiSpeL**, Az. **BK6-25-038 / 618-25-02** — [Verfahrensseite](https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/start.html)
  - Konsultationsentwurf 18.09.2025 (Tenor + Anlage 1 "Abgrenzungsoption" + Anlage 2 "Pauschaloption")
  - **§19 Abs. 3b EEG** (Abgrenzungsoption) / **§19 Abs. 3c EEG** (Pauschaloption); §85d EEG 2023 (deadline); §118 Abs. 6 EnWG ("wenn"→"soweit", 2025-11-13) for context
  - Stellungnahmen: bne, EnBW, 1KOMMA5° (618-25-02 docket) — *named experts to cite + reach out to*
- **Live data feed**: the **Verfahrensstatus itself** is the data. v0 = a hand-maintained `status.json` (current phase, last BNetzA update date, whether Festlegung issued). Manual is fine and honest — versioned, dated, with source link. Optional: open-MaStR Stromspeicher count → "~X co-location BESS in DE potentially affected".
- **Reform / staleness risk = THE central risk** (see §9). The Festlegung will drop, probably within this tool's launch window. Tool must be built to *flip state gracefully* the day it lands, not be invalidated by it.

## 4. Scope — v0 (ship in 3 days)

- **Core hero (ship first)**: a live **status banner + countdown** — "Stand: Festlegung noch nicht erlassen · X Tage bis 30.06.2026 (gesetzliche Frist §85d EEG)" — paired with the **option-chooser result**. One screenshot must tell the whole story.
- **v0 feature list (tight)**:
  1. **Status & countdown** — live timer to 2026-06-30 23:59 MEZ + dated procedural state from `status.json`. "Was passiert am 01.07.2026" explainer.
  2. **"Bin ich betroffen?"** — 3–4 question decision tree (Mixed-Use/Co-Location? EEG-Anlage beteiligt? Speicher oder Ladepunkt?) → green/amber/red verdict.
  3. **Abgrenzung vs. Pauschale chooser** — the credential core (see §5): inputs → which option likely fits + rough €-comparison.
  4. **Plain-language explainer** — the two options, what each demands (viertelstündliche Messung vs Pauschalansatz), in DE, with source links per claim.
- **Explicitly OUT of v0**: prefilled submission XML/PDF generator (no schema exists); legal-grade calculation; account/login; English UI (DE-first, EN README only).

## 5. The core computation / methodology (guardrail #1 — show the arithmetic)

The **Abgrenzung-vs-Pauschal economic chooser** is what makes this a credential not a clock. Plain, transparent, assumption-flagged:

- **Inputs** (user): Speichergröße (kWh / kW), jährl. Netzbezug-Anteil zum Laden (%), Direktvermarktungs-Erlös p.a. (€), vorhandene Messtechnik (RLM/viertelstündlich vorhanden? ja/nein).
- **Abgrenzungsoption (§19 Abs. 3b)**: viertelstündliche messwertbasierte Zuordnung → höhere Mess-/Abrechnungskosten, aber präzise Graustrom-Abgrenzung → behält EEG-Förderung auf den abgegrenzten Grünstrom-Anteil. Cost side: Messkonzept + RLM-Aufwand (assumption: €X/yr, flagged).
- **Pauschaloption (§19 Abs. 3c)**: vereinfachter Pauschalansatz → minimale Messanforderung, aber pauschaler (i.d.R. ungünstigerer) Förder-/Anrechnungsschnitt → Erlös-Abschlag auf den Grünstromanteil.
- **Output**: side-by-side € — "geschätzter Netto-Vorteil Abgrenzung vs. Pauschale = Mehrerlös − Mehr-Messkosten", plus a plain verdict ("Bei Deiner Größe + vorhandener RLM-Messung lohnt sich die Abgrenzungsoption ab ca. … €/Jahr Erlös").
- **Confidence band**: every coefficient labelled *Annahme* with the source or "noch offen — Festlegung ausstehend". The tool states it computes an *order-of-magnitude decision aid*, not a binding figure. Where the draft leaves a number open, say so rather than invent one.

## 6. Viral / distribution design

- **One-screenshot story**: countdown + red/amber/green verdict + the €-delta between the two options. Tweetable as "22 Tage bis MiSpeL, und die wichtigste Frage ist noch offen."
- **OG card** (server-rendered, current data): "**X Tage bis zur MiSpeL-Frist (30.06.2026)** — Abgrenzung oder Pauschale? · Stand: [status]" + author block. Regenerates daily so the number is always live.
- **Querystring state**: `?groesse=…&netzanteil=…&messtechnik=rlm` → shareable chooser result; embeddable iframe of the countdown for Kanzlei/blog sites.
- **Methodology page** + named author ("kuratiert von [name], curious operator w/ deep product+eng background — keine Rechtsberatung").
- **Channels** (where the *right* audience is, not generic): LinkedIn (DE energy-law + storage crowd — tag/cite the bne/EnBW/1KOMMA5° Stellungnahme authors); r/Photovoltaik & r/Speichertechnik; Kanzlei-blog comment threads (BBH, KPMG-Law) as an embed offer; speicher/co-location Slack+Discord. **Direct outreach** to the 48 Stellungnahme-submitters — highest-intent experts in the country on this exact topic.
- **Companion posts**: (a) DE-regulatory high-intent — "MiSpeL in 5 Minuten: Abgrenzung vs. Pauschale, und was es kostet"; (b) build-process — "Ich habe einen MiSpeL-Tracker an einem Wochenende gebaut — was ich über §19 EEG gelernt habe."
- **Feeds the daily-social-brand?** Yes — daily "X Tage bis MiSpeL + Status" auto-post seeds the program-level account.

## 7. Success metrics

- **Reach** (deadline-bounded, so judge fast): visits + chooser-completions through 30.06.2026; embed installs on Kanzlei/operator sites.
- **Expert-conversation KPI** (the real win): **≥5 substantive replies/DMs/corrections from named operators, Direktvermarkter, or the Stellungnahme-author pool** within 3 weeks of launch. Each correction = domain learning + a Rung-1 contact.
- **Lead-gen / thesis signal**: ≥1 inbound "can you help with our actual MiSpeL decision?" → validates the compliance-copilot thesis → double-down trigger. Zero engagement from operators (only generic likes) within 3 weeks → the regulatory-translation thesis is weaker than hoped; log it and weight later PRDs toward consumer-reach tools.

## 8. Credential guardrails (SCORING gate)
- [x] Rigor: option-chooser computes from §19 Abs. 3b/3c mechanics; arithmetic + assumptions shown, open numbers flagged open
- [x] Anti-promise "What this is NOT": *keine Rechtsberatung; kein offizielles BNetzA-Tool; Entscheidungshilfe in Größenordnung, finale Festlegung maßgeblich*
- [x] Invite-correction CTA: "Wo vereinfache ich zu stark? Was fehlt? Sag mir, was Deine Praxis anders sieht."
- [x] Domain-honest framing: "curious operator w/ deep adjacent product+eng experience", never "Energierechts-Experte"
- [x] Reform/staleness honesty: live status state + version stamp; explicit "Festlegung noch nicht erlassen — dieses Tool wird am Tag der Veröffentlichung aktualisiert"

## 9. Risks & mitigations
- **R1 — Festlegung drops mid-launch and changes the mechanic.** *This is expected, not a tail risk.* Mitigation: architect state from `status.json`; pre-write the "Festlegung erlassen am [date]" banner + a diff note ("was sich geändert hat"); treat the drop as a *second launch moment* (relevance spike), not a death. Turning the reform event into content is the play.
- **R2 — Getting the Abgrenzung/Pauschal economics wrong in public** (experts will check). Mitigation: order-of-magnitude framing, every coefficient flagged Annahme, invite-correction CTA front and center, cite the Stellungnahmen. Better to be transparently approximate than confidently wrong.
- **R3 — Deadline passes, tool goes stale 30.06.** Mitigation: accept it — time-decay is priced in (Decay ×1.4). Post-deadline it pivots to "MiSpeL ist da: Abgrenzung oder Pauschale für Deinen Speicher?" (the chooser outlives the countdown).
- **R4 — Niche reach (B2B, R=1.5) → few visitors.** Mitigation: the win is *who*, not *how many* — 50 right operators > 50k randoms. Outreach to Stellungnahme-authors is the real distribution, not virality.

## 10. Definition of Done
- Public repo (personal GitHub), README DE + EN
- Author block + reach-out hook ("MiSpeL ein Blackbox? 30-Min-Walkthrough, kostenlos bis 30.06.")
- Live deploy + server-rendered OG card (live countdown) + querystring state + embeddable countdown + methodology page
- `status.json` versioned + dated; "Festlegung erlassen" banner pre-staged
- Companion posts (regulatory + build-process) drafted; daily-social auto-post wired
- Plausible analytics; MIT + CC BY 4.0
- BUILD-PLAN.md updated with launch date + initial metrics

## 11. RICE inputs (fine-pass)
| Reach | Impact (Cred/Lead/Thesis/Learn) | Confidence | Effort(d) | StratLev | TimeDecay | Priority |
|---|---|---|---|---|---|---|
| 1.5 | 2.40 (2 / 2.5 / 3 / 2) | .85 | 3 | 1.0 | 1.4 | **1.43** |

*Fine-pass note:* Confidence held at .85 despite reform-in-flight because the **reframe absorbs the reform as a feature** (R1) rather than betting against it. StratLev stays 1.0 (pipeline-builder value is real but counted as the team's deploy-plumbing investment, not project leverage). Reach 1.5 is the honest B2B-niche figure — do not inflate; the value is captured in the high Thesis (3) and Lead (2.5) sub-scores per the SCORING bias note.
