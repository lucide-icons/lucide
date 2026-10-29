import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Infinity as InfinityExport, createIcons, icons } from '../src/lucide';
import infinityNode from '../src/icons/infinity';
import { getOriginalSvg } from './helpers';

describe('generated icon modules', () => {
  it('does not shadow the Hermes Infinity global', () => {
    const source = readFileSync('./src/icons/infinity.ts', 'utf8');

    expect(source).toContain('const InfinityIcon: IconNode');
    expect(source).toContain('export default InfinityIcon');
    expect(source).not.toMatch(/\bconst Infinity\b/);
  });

  it('preserves Infinity in the named exports and icon lookup', () => {
    expect(InfinityExport).toBe(infinityNode);
    expect(icons.Infinity).toBe(infinityNode);
  });

  it('renders the infinity icon through the public createIcons API', () => {
    const root = document.createElement('div');
    root.innerHTML = '<i data-lucide="infinity"></i>';

    createIcons({ icons, root });

    expect(root.innerHTML).toBe(getOriginalSvg('infinity'));
  });
});
