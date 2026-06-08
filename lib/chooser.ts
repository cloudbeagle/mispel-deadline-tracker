/**
 * MiSpeL Abgrenzungs- vs. Pauschal-Option economic comparison.
 *
 * ALL coefficients are assumptions (Annahmen) from the BNetzA Konsultationsentwurf
 * 18.09.2025 (BK6-25-038) or flagged as 'noch offen — Festlegung ausstehend'.
 * This module computes order-of-magnitude decision aids, NOT binding figures.
 *
 * Sources:
 *   - BNetzA Konsultationsentwurf 18.09.2025, Anlage 1 (Abgrenzungsoption)
 *   - BNetzA Konsultationsentwurf 18.09.2025, Anlage 2 (Pauschaloption)
 *   - §19 Abs. 3b EEG (Abgrenzungsoption)
 *   - §19 Abs. 3c EEG (Pauschaloption)
 */

export interface ChooserInputs {
  groesseKwh: number;    // Speichergröße in kWh (Nutzkapazität)
  groesseKw: number;     // Speicherleistung in kW
  netzanteilProzent: number; // jährl. Netzbezug-Anteil zum Laden (0–100 %)
  erloesEurJahr: number; // Direktvermarktungs-Erlös p.a. in €
  hatRlm: boolean;       // RLM/viertelstündliche Messung vorhanden?
}

export interface OptionResult {
  messkosten: number;            // €/Jahr
  erloesauswirkung: number;      // €/Jahr (positiv = Vorteil)
  nettoVorteil: number;          // €/Jahr (positiv = besser als Gegenstück)
  koeffizienten: Koeffizient[];
}

export interface Koeffizient {
  name: string;
  wert: string;
  quelle: string;
  offen: boolean; // true → Festlegung ausstehend
}

export interface ChooserResult {
  abgrenzung: OptionResult;
  pauschale: OptionResult;
  empfehlung: 'abgrenzung' | 'pauschale' | 'gleich';
  verdictText: string;
  breakEvenErloese: number; // €/Jahr Erlös ab dem Abgrenzung lohnt
}

// ---------------------------------------------------------------------------
// Assumption constants (all from Konsultationsentwurf 18.09.2025 or flagged)
// ---------------------------------------------------------------------------

/** RLM-Messung Grundkosten p.a. (Annahme: Marktüblich für Netzbetreiber-RLM) */
const RLM_KOSTEN_GRUND_EUR = 1_500;

/** Zusätzliche RLM-Kosten pro kW installierter Leistung (Annahme: ~€5/kW/Jahr) */
const RLM_KOSTEN_PRO_KW_EUR = 5;

/** Pauschalansatz-Messkosten p.a. (Annahme: einfache Zählerablesung) */
const PAUSCHALE_MESSKOSTEN_EUR = 300;

/**
 * Grünstromanteil-Aufschlag bei Abgrenzungsoption vs. Pauschalansatz.
 * Die Abgrenzungsoption erlaubt viertelstündliche Abgrenzung: in der Praxis
 * erzielt ein typisches Mixed-Use-BESS ~15–25 % mehr anrechenbaren Grünstrom
 * gegenüber dem Pauschalansatz.
 * Annahme: 20 % Mehrertrag auf den Grünstromanteil — Festlegung ausstehend.
 */
const ABGRENZUNG_GRUEN_MEHRERTRAG_FAKTOR = 0.20; // noch offen

/**
 * Pauschalansatz Abschlag (§19 Abs. 3c EEG): pauschale Einschränkung des
 * anrechenbaren Grünstromanteils. Annahme: –30 % gegenüber rechnerischem
 * Grünstromanteil — Festlegung ausstehend.
 */
const PAUSCHALE_ABSCHLAG_FAKTOR = 0.30; // noch offen

/**
 * Durchschnittlicher EEG-Vergütungsunterschied (Grünstrom vs. kein EEG-Vorteil)
 * in ct/kWh. Wird nicht direkt benötigt — wir rechnen auf Basis der
 * eingegebenen Erlöse und Anteile.
 */

// ---------------------------------------------------------------------------
// Core calculation
// ---------------------------------------------------------------------------

export function calculate(inputs: ChooserInputs): ChooserResult {
  const {
    groesseKwh,
    groesseKw,
    netzanteilProzent,
    erloesEurJahr,
    hatRlm,
  } = inputs;

  // Grünstromanteil (vereinfacht: Umkehrteil des Netzbezugs)
  const gruenstromAnteil = Math.max(0, (100 - netzanteilProzent) / 100);

  // ---- Abgrenzungsoption (§19 Abs. 3b) -----------------------------------

  // Messkosten: RLM-Grundkosten + leistungsabhängiger Anteil
  const abgrenzungMesskosten = hatRlm
    ? RLM_KOSTEN_GRUND_EUR + groesseKw * RLM_KOSTEN_PRO_KW_EUR * 0.5 // RLM vorhanden → nur Mehraufwand
    : RLM_KOSTEN_GRUND_EUR + groesseKw * RLM_KOSTEN_PRO_KW_EUR;

  // Erlösauswirkung: Grünstrom-Mehrertrag gegenüber Pauschalansatz
  const abgrenzungGruenstromErloes =
    erloesEurJahr * gruenstromAnteil * (1 + ABGRENZUNG_GRUEN_MEHRERTRAG_FAKTOR);

  // ---- Pauschaloption (§19 Abs. 3c) ----------------------------------------

  const pauschalMesskosten = PAUSCHALE_MESSKOSTEN_EUR;

  // Pauschalansatz: Erlösabschlag gegenüber rechnerischem Anteil
  const pauschalGruenstromErloes =
    erloesEurJahr * gruenstromAnteil * (1 - PAUSCHALE_ABSCHLAG_FAKTOR);

  // ---- Netto-Vergleich ------------------------------------------------------

  // Netto = Erlös − Kosten (verglichen mit einer Referenz ohne Förderung)
  // Wir vergleichen die beiden Optionen direkt gegeneinander.
  const abgrenzungNetto = abgrenzungGruenstromErloes - abgrenzungMesskosten;
  const pauschalNetto = pauschalGruenstromErloes - pauschalMesskosten;

  const delta = abgrenzungNetto - pauschalNetto;

  // Break-even: ab welchem Erlösniveau lohnt Abgrenzung mehr als Pauschale?
  // abgrenzungNetto > pauschalNetto
  // erloese * gruenstromAnteil * (1+MEHR) - abgrMessk > erloese * gruenstromAnteil * (1-ABSCHLAG) - pauschMessk
  // erloese * gruenstromAnteil * (MEHR + ABSCHLAG) > abgrMessk - pauschMessk
  let breakEvenErloese = 0;
  const erloesFaktor = gruenstromAnteil * (ABGRENZUNG_GRUEN_MEHRERTRAG_FAKTOR + PAUSCHALE_ABSCHLAG_FAKTOR);
  if (erloesFaktor > 0) {
    breakEvenErloese = (abgrenzungMesskosten - pauschalMesskosten) / erloesFaktor;
  }

  const empfehlung: 'abgrenzung' | 'pauschale' | 'gleich' =
    delta > 100 ? 'abgrenzung' : delta < -100 ? 'pauschale' : 'gleich';

  const messtechnikText = hatRlm ? 'vorhandener RLM-Messung' : 'ohne RLM-Messung';
  const groesseText = `${groesseKwh} kWh / ${groesseKw} kW`;

  let verdictText: string;
  if (empfehlung === 'abgrenzung') {
    verdictText = `Bei Ihrer Größe (${groesseText}) + ${messtechnikText} lohnt sich die Abgrenzungsoption (§19 Abs. 3b) ab ca. ${fmt(Math.max(0, breakEvenErloese))} €/Jahr Erlös. Ihr aktuell eingegebener Erlöswert liegt ${delta > 0 ? 'darüber' : 'darunter'}.`;
  } else if (empfehlung === 'pauschale') {
    verdictText = `Bei Ihrer Größe (${groesseText}) + ${messtechnikText} ist die Pauschaloption (§19 Abs. 3c) vorteilhafter — die höheren Messkosten der Abgrenzungsoption rechnen sich erst ab ca. ${fmt(Math.max(0, breakEvenErloese))} €/Jahr Erlös.`;
  } else {
    verdictText = `Bei Ihrer Größe (${groesseText}) + ${messtechnikText} liegen beide Optionen rechnerisch nahe beieinander (Δ < 100 €/Jahr). Die Entscheidung hängt von weiteren Faktoren ab (Messverfügbarkeit, Abrechnungsaufwand).`;
  }

  const abgrenzungKoeffizienten: Koeffizient[] = [
    {
      name: 'RLM-Messkosten Grundpauschale',
      wert: `${RLM_KOSTEN_GRUND_EUR} €/Jahr`,
      quelle: 'Annahme (Marktüblich Netzbetreiber-RLM)',
      offen: false,
    },
    {
      name: 'RLM-Messkosten pro kW',
      wert: `${RLM_KOSTEN_PRO_KW_EUR} €/kW/Jahr`,
      quelle: 'Annahme',
      offen: false,
    },
    {
      name: 'Grünstrom-Mehrertrag Abgrenzung vs. Pauschale',
      wert: `+${(ABGRENZUNG_GRUEN_MEHRERTRAG_FAKTOR * 100).toFixed(0)} %`,
      quelle: 'Annahme — Festlegung ausstehend (BK6-25-038, Anlage 1)',
      offen: true,
    },
  ];

  const pauschalKoeffizienten: Koeffizient[] = [
    {
      name: 'Pauschal-Messkosten',
      wert: `${PAUSCHALE_MESSKOSTEN_EUR} €/Jahr`,
      quelle: 'Annahme (einfache Zählerablesung)',
      offen: false,
    },
    {
      name: 'Pauschalansatz Erlösabschlag',
      wert: `−${(PAUSCHALE_ABSCHLAG_FAKTOR * 100).toFixed(0)} %`,
      quelle: 'Annahme — Festlegung ausstehend (BK6-25-038, Anlage 2)',
      offen: true,
    },
  ];

  return {
    abgrenzung: {
      messkosten: abgrenzungMesskosten,
      erloesauswirkung: abgrenzungGruenstromErloes,
      nettoVorteil: abgrenzungNetto,
      koeffizienten: abgrenzungKoeffizienten,
    },
    pauschale: {
      messkosten: pauschalMesskosten,
      erloesauswirkung: pauschalGruenstromErloes,
      nettoVorteil: pauschalNetto,
      koeffizienten: pauschalKoeffizienten,
    },
    empfehlung,
    verdictText,
    breakEvenErloese: Math.max(0, breakEvenErloese),
  };
}

export function fmt(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function buildQueryString(inputs: ChooserInputs): string {
  const params = new URLSearchParams({
    groesse: `${inputs.groesseKwh}_${inputs.groesseKw}`,
    netzanteil: String(inputs.netzanteilProzent),
    erloese: String(inputs.erloesEurJahr),
    messtechnik: inputs.hatRlm ? 'rlm' : 'keine',
  });
  return params.toString();
}

export function parseQueryString(search: string): Partial<ChooserInputs> {
  const params = new URLSearchParams(search);
  const result: Partial<ChooserInputs> = {};

  const groesse = params.get('groesse');
  if (groesse) {
    const [kwh, kw] = groesse.split('_').map(Number);
    if (!isNaN(kwh) && kwh > 0) result.groesseKwh = kwh;
    if (!isNaN(kw) && kw > 0) result.groesseKw = kw;
  }

  const netzanteil = params.get('netzanteil');
  if (netzanteil) {
    const v = Number(netzanteil);
    if (!isNaN(v) && v >= 0 && v <= 100) result.netzanteilProzent = v;
  }

  const erloese = params.get('erloese');
  if (erloese) {
    const v = Number(erloese);
    if (!isNaN(v) && v >= 0) result.erloesEurJahr = v;
  }

  const messtechnik = params.get('messtechnik');
  if (messtechnik) {
    result.hatRlm = messtechnik === 'rlm';
  }

  return result;
}
