import { describe, expect, it } from 'vitest';
import { House } from '../src/lucide-icons';

describe('lucide-icons', () => {
  it('should init', () => {
    const HouseSVG = House;

    expect(House).toMatchObject(House);
  });
});
