import statusData from '../public/status.json';

export interface MiSpeLStatus {
  phase: string;
  last_bnetza_update: string;
  festlegung_issued: boolean;
  festlegung_date: string | null;
  statutory_deadline: string;
  source_url: string;
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function validateStatus(data: unknown): MiSpeLStatus {
  if (typeof data !== 'object' || data === null) {
    throw new Error('status.json: root must be an object');
  }
  const d = data as Record<string, unknown>;

  if (typeof d.phase !== 'string') throw new Error('status.json: phase must be string');
  if (typeof d.last_bnetza_update !== 'string' || !ISO_DATE_RE.test(d.last_bnetza_update))
    throw new Error('status.json: last_bnetza_update must be ISO date');
  if (typeof d.festlegung_issued !== 'boolean')
    throw new Error('status.json: festlegung_issued must be boolean');
  if (!('festlegung_date' in d))
    throw new Error('status.json: festlegung_date is required');
  if (d.festlegung_date !== null &&
      (typeof d.festlegung_date !== 'string' || !ISO_DATE_RE.test(d.festlegung_date)))
    throw new Error('status.json: festlegung_date must be ISO date or null');
  if (typeof d.statutory_deadline !== 'string' || !ISO_DATE_RE.test(d.statutory_deadline))
    throw new Error('status.json: statutory_deadline must be ISO date');
  if (typeof d.source_url !== 'string' || !d.source_url.startsWith('https://'))
    throw new Error('status.json: source_url must be an https URL');

  return d as unknown as MiSpeLStatus;
}

export function getStatus(): MiSpeLStatus {
  return validateStatus(statusData);
}
