import { describe, it, expect } from 'vitest';
import { mergeClasses, toKebabCase } from '../src/utils';

describe('mergeClasses', () => {
  it('merges classes', async () => {
    const classes = mergeClasses('lucide', 'lucide-circle', 'custom-class');
    expect(classes).toBe('lucide lucide-circle custom-class');
  });
  it('ignores empty string', async () => {
    const classes = mergeClasses('lucide', 'lucide-circle', '');
    expect(classes).toBe('lucide lucide-circle');
  });
  it('ignores undefined', async () => {
    const classes = mergeClasses('lucide', 'lucide-circle', undefined);
    expect(classes).toBe('lucide lucide-circle');
  });
  it('removes duplicates', async () => {
    const classes = mergeClasses('lucide', 'lucide-circle', 'lucide');
    expect(classes).toBe('lucide lucide-circle');
  });
  it('trims the string', async () => {
    const classes = mergeClasses('lucide', 'lucide-circle', ' ');
    expect(classes).toBe('lucide lucide-circle');
  });
  it('trims the sub strings', async () => {
    const classes = mergeClasses('lucide', ' ', 'lucide-circle');
    expect(classes).toBe('lucide lucide-circle');
  });
});

describe('toKebabCase', () => {
  it('converts to kebab case', async () => {
    const kebabCase = toKebabCase('LoaderCircle');
    expect(kebabCase).toBe('loader-circle');
  });
  it('handles single word', async () => {
    const kebabCase = toKebabCase('Dot');
    expect(kebabCase).toBe('dot');
  });
  it('handles consecutive uppercase letters', async () => {
    const kebabCase = toKebabCase('AArrowDown');
    expect(kebabCase).toBe('a-arrow-down');
  });
  it('handles numbers', async () => {
    const kebabCase = toKebabCase('Loader2');
    expect(kebabCase).toBe('loader-2');
  });
  it('handles consecutive numbers', async () => {
    const kebabCase = toKebabCase('Clock10');
    expect(kebabCase).toBe('clock-10');
  });
  it('handles numbers and letters', async () => {
    const kebabCase = toKebabCase('Scale3d');
    expect(kebabCase).toBe('scale-3d');
  });

  it('handles numbers already in words', async () => {
    const kebabCase = toKebabCase('Grid3x3X');
    expect(kebabCase).toBe('grid-3x3-x');
  });
});
