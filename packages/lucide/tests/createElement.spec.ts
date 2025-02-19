import { describe, it, expect } from 'vitest';
import { House, createElement } from '../src/lucide';
import { getOriginalSvg } from './helpers';

describe('createElement', () => {
  it('should create SVG Element', () => {
    const HomeSVG = createElement(House);

    expect(HomeSVG.tagName).toBe('svg');
  });

  it('should match the snapshot', () => {
    const HomeSVG = createElement(House);

    expect(HomeSVG.outerHTML).toMatchSnapshot();
  });

  it('should create SVG Element with attributes', () => {
    const HomeSVG = createElement(House, { fill: 'red' });

    expect(HomeSVG.getAttribute('fill')).toBe('red');
  });

  it('should create SVG Element with class name', () => {
    const HomeSVG = createElement(House, { class: 'icon' });

    expect(HomeSVG.getAttribute('class')).toBe('icon');
  });

  it('should create the correct svg element', () => {
    const HomeSVG = createElement(House);

    const svg = getOriginalSvg('house', undefined, false);

    expect(HomeSVG.outerHTML).toBe(svg);
  });
});
