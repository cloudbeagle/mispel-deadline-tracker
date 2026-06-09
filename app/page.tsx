import Link from 'next/link';
import { getStatus } from '../lib/status';
import StatusBanner from '../components/StatusBanner';
import CountdownHero from '../components/CountdownHero';
import WhatHappensExplainer from '../components/WhatHappensExplainer';
import AbgrenzungChooser from '../components/AbgrenzungChooser';
import BinIchBetroffen from '../components/BinIchBetroffen';
import ShareBar from '../components/ShareBar';

// 2026-06-30 23:59 CEST (UTC+2) = 2026-06-30T21:59:00Z
const DEADLINE_UTC = new Date('2026-06-30T21:59:00Z').getTime();

export default function Home() {
  const status = getStatus();

  const now = Date.now();
  const diff = DEADLINE_UTC - now;
  const deadlinePassed = diff <= 0;
  const initialDays = deadlinePassed ? 0 : Math.floor(diff / 86_400_000);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">MiSpeL Deadline Tracker</h1>
          <p className="text-muted-foreground text-sm">
            BNetzA Festlegungsverfahren BK6-25-038 / 618-25-02
          </p>
        </header>

        <StatusBanner status={status} />

        <div className="rounded-xl border bg-card px-6 py-10 shadow-sm">
          <CountdownHero initialDays={initialDays} deadlinePassed={deadlinePassed} />
        </div>

        <ShareBar />

        <WhatHappensExplainer />

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Abgrenzung vs. Pauschale — Entscheidungshilfe</h2>
          <p className="text-sm text-muted-foreground">
            Welche MiSpeL-Option passt zu Ihrer Anlage? Geben Sie Ihre Anlagendaten ein
            und erhalten Sie einen groben €-Vergleich.
          </p>
        </section>

        <AbgrenzungChooser />

        <BinIchBetroffen />

        <footer className="border-t pt-6 text-center text-xs text-muted-foreground space-y-1">
          <p>
            <Link href="/methodik" className="underline hover:no-underline">
              Methodik & Datenquellen
            </Link>
            {' · '}
            Keine Rechtsberatung · Kein offizielles BNetzA-Tool
          </p>
          <p>
            kuratiert von{' '}
            <a
              href="https://www.linkedin.com/in/gaylordzach/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Gaylord Zach
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
