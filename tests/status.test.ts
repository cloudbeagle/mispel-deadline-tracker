// Run: npx tsx --test tests/status.test.ts
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateStatus } from '../lib/status';

const VALID: Record<string, unknown> = {
  phase: 'Konsultation abgeschlossen',
  last_bnetza_update: '2025-11-12',
  festlegung_issued: false,
  festlegung_date: null,
  statutory_deadline: '2026-06-30',
  source_url: 'https://www.bundesnetzagentur.de/example',
};

describe('validateStatus', () => {
  it('accepts valid input', () => {
    const result = validateStatus(VALID);
    assert.strictEqual(result.phase, 'Konsultation abgeschlossen');
    assert.strictEqual(result.festlegung_issued, false);
    assert.strictEqual(result.festlegung_date, null);
  });

  it('accepts festlegung_date as ISO date string', () => {
    const result = validateStatus({ ...VALID, festlegung_date: '2026-06-30', festlegung_issued: true });
    assert.strictEqual(result.festlegung_date, '2026-06-30');
  });

  it('throws on missing required field', () => {
    const { phase: _, ...noPhase } = VALID;
    assert.throws(() => validateStatus(noPhase), /phase must be string/);
  });

  it('throws on bad ISO date for last_bnetza_update', () => {
    assert.throws(
      () => validateStatus({ ...VALID, last_bnetza_update: '20251112' }),
      /last_bnetza_update must be ISO date/,
    );
  });

  it('throws when festlegung_date key is absent (not merely null)', () => {
    const { festlegung_date: _, ...noKey } = VALID;
    assert.throws(() => validateStatus(noKey), /festlegung_date is required/);
  });

  it('accepts festlegung_date: null', () => {
    const result = validateStatus({ ...VALID, festlegung_date: null });
    assert.strictEqual(result.festlegung_date, null);
  });

  it('throws on explicit undefined festlegung_date (key present, value invalid)', () => {
    // Spread keeps the key in object, so 'in' check passes; falls through to type check.
    assert.throws(
      () => validateStatus({ ...VALID, festlegung_date: undefined }),
      /festlegung_date must be ISO date or null/,
    );
  });

  it('throws on non-https source_url', () => {
    assert.throws(
      () => validateStatus({ ...VALID, source_url: 'http://example.com' }),
      /source_url must be an https URL/,
    );
  });

  it('throws when root is not an object', () => {
    assert.throws(() => validateStatus(null), /root must be an object/);
    assert.throws(() => validateStatus('string'), /root must be an object/);
  });
});
