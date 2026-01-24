import { describe, expect, it } from 'vitest';
import { House } from '../src/lucide-icons';
import { getOriginalSvg, removeKeys } from './helpers';
import buildLucideIconElement from '../src/buildLucideIconElement';

describe('buildLucideIconElement', () => {
  it('should create SVG Element', () => {
    const HomeSVG = buildLucideIconElement(document, House);

    expect(HomeSVG.tagName).toBe('svg');
  });

  it('should match the snapshot', () => {
    const HomeSVG = buildLucideIconElement(document, House);

    expect(HomeSVG.outerHTML).toMatchSnapshot();
  });

  it('should create SVG Element with attributes', () => {
    const HomeSVG = buildLucideIconElement(document, House, { attributes: { fill: 'red' } });

    expect(HomeSVG.getAttribute('fill')).toBe('red');
  });

  it('should create SVG Element with class name', () => {
    const HomeSVG = buildLucideIconElement(document, House, { attributes: { class: 'icon' } });

    expect(HomeSVG.getAttribute('class')).toBe('icon');
  });

  it('should merge classes', () => {
    const HomeSVG = buildLucideIconElement(document, House, { className: 'icon' });

    expect(HomeSVG.getAttribute('class')).toBe('lucide lucide-house icon');
  });

  it('should create the correct svg element', () => {
    const HomeSVG = buildLucideIconElement(document, House);

    const svg = getOriginalSvg('house', undefined, true);

    expect(removeKeys(HomeSVG.outerHTML)).toBe(svg);
  });
});
