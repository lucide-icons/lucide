import { describe, expect, it } from 'vitest';
import { House } from '../src/lucide-icons';
import { getOriginalSvg, removeKeys } from './helpers';
import buildLucideSvg from '../src/buildLucideSvg';
import buildLucideDataUri from '../src/buildLucideDataUri';

describe('buildLucideSvg', () => {
  it('should match the snapshot', () => {
    const HouseSVG = buildLucideSvg(House);

    expect(HouseSVG).toMatchSnapshot();
  });

  it('should create the correct svg element', () => {
    const HouseSVG = buildLucideSvg(House);

    const svg = getOriginalSvg('house', ['home']);

    expect(removeKeys(HouseSVG)).toBe(svg);
  });
});

describe('buildLucideSvgDataUri', () => {
  it('should match the snapshot', () => {
    const HouseDataUri = buildLucideDataUri(House);

    expect(HouseDataUri).toMatchSnapshot();
  });
});
