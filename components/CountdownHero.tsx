'use client';

import { useEffect, useState } from 'react';

// 2026-06-30 23:59 CEST = UTC+2 → 2026-06-30T21:59:00Z
const DEADLINE_UTC = new Date('2026-06-30T21:59:00Z').getTime();

function computeRemaining(now: number) {
  const diff = DEADLINE_UTC - now;
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return { days, hours, minutes };
}

interface CountdownHeroProps {
  initialDays: number;
  deadlinePassed: boolean;
}

export default function CountdownHero({ initialDays, deadlinePassed }: CountdownHeroProps) {
  const [remaining, setRemaining] = useState<{ days: number; hours: number; minutes: number } | null>(
    deadlinePassed ? null : { days: initialDays, hours: 0, minutes: 0 }
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const update = () => setRemaining(computeRemaining(Date.now()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const passed = remaining === null;

  return (
    <div className="text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
        §85d EEG — gesetzliche Frist
      </p>

      {passed ? (
        <div className="space-y-1">
          <p className="text-5xl font-bold tabular-nums">0 Tage</p>
          <p className="text-lg text-muted-foreground">
            Frist abgelaufen — Festlegung in Kraft ab 01.07.2026
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-6xl font-bold tabular-nums" suppressHydrationWarning>
            {hydrated ? remaining!.days : initialDays}
          </p>
          <p className="text-2xl font-semibold text-muted-foreground">
            Tage bis 30.06.2026, 23:59 MEZ
          </p>
          {hydrated && (
            <p className="text-sm text-muted-foreground tabular-nums">
              noch {remaining!.hours}h {remaining!.minutes}min
            </p>
          )}
        </div>
      )}
    </div>
  );
}
