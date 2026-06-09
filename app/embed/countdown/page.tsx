'use client';

// Minimal iframe-embeddable countdown widget.
// No navigation chrome; designed for 400×120px.
// Embed snippet: <iframe src="[origin]/embed/countdown" width="400" height="120"
//   frameborder="0" style="border:none;overflow:hidden" allowtransparency="true"
//   title="MiSpeL Deadline Countdown"></iframe>

import { useEffect, useState } from 'react';

// 2026-06-30 23:59 CEST (UTC+2) = 2026-06-30T21:59:00Z
const DEADLINE_UTC = new Date('2026-06-30T21:59:00Z').getTime();

export default function EmbedCountdownPage() {
  const [days, setDays] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = DEADLINE_UTC - Date.now();
      if (diff <= 0) {
        setPassed(true);
        setDays(0);
      } else {
        setPassed(false);
        setDays(Math.floor(diff / 86_400_000));
      }
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const statusLabel = passed
    ? 'Frist abgelaufen — ab 01.07.2026 in Kraft'
    : 'Tage bis 30.06.2026, 23:59 MEZ';

  return (
    <div
      style={{
        width: '400px',
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, Helvetica, sans-serif',
        background: '#ffffff',
        color: '#141528',
        padding: '8px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          margin: '0 0 2px',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#888',
        }}
      >
        §85d EEG — gesetzliche Frist
      </p>

      <p
        suppressHydrationWarning
        style={{
          margin: '0',
          fontSize: '46px',
          fontWeight: 'bold',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          color: passed ? '#666' : '#141528',
        }}
      >
        {days === null ? '—' : days}
      </p>

      <p
        style={{
          margin: '3px 0 0',
          fontSize: '12px',
          color: '#555',
          textAlign: 'center',
        }}
      >
        {statusLabel}
      </p>

      <p style={{ margin: '4px 0 0', fontSize: '9px', color: '#bbb' }}>
        <a
          href="https://mispel-deadline-tracker.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#bbb', textDecoration: 'none' }}
        >
          mispel-deadline-tracker.vercel.app
        </a>
      </p>
    </div>
  );
}
