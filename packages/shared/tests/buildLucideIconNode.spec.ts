import { describe, it, expect } from 'vitest';
import buildLucideIconNode from '../src/build/buildLucideIconNode';

const icon = { name: 'circle', size: 24, node: [] };

const strokeWidthOf = (params: Parameters<typeof buildLucideIconNode>[1]) =>
  buildLucideIconNode(icon, params)[1]['stroke-width'];

describe('buildLucideIconNode absoluteStrokeWidth', () => {
  it('scales the stroke width for numeric sizes', () => {
    expect(strokeWidthOf({ absoluteStrokeWidth: true, strokeWidth: 2, size: 48 })).toBe(1);
  });

  it('falls back to the unscaled width for a CSS unit size', () => {
    expect(strokeWidthOf({ absoluteStrokeWidth: true, strokeWidth: 2, size: '1em' })).toBe(2);
  });

  it('falls back to the unscaled width for a non-numeric stroke width', () => {
    expect(strokeWidthOf({ absoluteStrokeWidth: true, strokeWidth: '1em', size: 48 })).toBe('1em');
  });

  it('falls back to the unscaled width for a zero size', () => {
    expect(strokeWidthOf({ absoluteStrokeWidth: true, strokeWidth: 2, size: 0 })).toBe(2);
  });

  it('leaves the stroke width alone when not absolute', () => {
    expect(strokeWidthOf({ strokeWidth: 2, size: 48 })).toBe(2);
  });
});
