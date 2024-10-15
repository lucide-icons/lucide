import { describe, it, expect } from 'vitest';
import { mergeClasses } from '../src/utils';

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
