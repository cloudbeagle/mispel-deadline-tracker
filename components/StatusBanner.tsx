import type { MiSpeLStatus } from '../lib/status';

interface StatusBannerProps {
  status: MiSpeLStatus;
}

export default function StatusBanner({ status }: StatusBannerProps) {
  if (status.festlegung_issued && status.festlegung_date) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
        <span className="font-semibold">Festlegung erlassen am {status.festlegung_date}</span>
        {' — '}
        <a
          href={status.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          BNetzA Verfahrensseite
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      Stand: <span className="font-semibold">{status.phase}</span>
      {' · '}
      Letzte BNetzA-Aktualisierung: {status.last_bnetza_update}
      {' · '}
      Quelle:{' '}
      <a
        href={status.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        BNetzA Verfahrensseite
      </a>
    </div>
  );
}
