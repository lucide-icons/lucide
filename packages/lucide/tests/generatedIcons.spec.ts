import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('generated icon modules', () => {
  it('does not shadow the Hermes Infinity global', () => {
    const source = readFileSync('./src/icons/infinity.ts', 'utf8');

    expect(source).toContain('const InfinityIcon: IconNode');
    expect(source).toContain('export default InfinityIcon');
    expect(source).not.toMatch(/\bconst Infinity\b/);
  });
});
