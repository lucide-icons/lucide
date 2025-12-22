import { describe, expect, it } from 'vitest';
import { House } from '../src/lucide-icons';
import buildLucideIconNode from '../src/buildLucideIconNode';

describe('buildLucideIconNode', () => {
  it('should create icon node', () => {
    const HouseSVG = buildLucideIconNode(House);

    expect(HouseSVG.at(0)).toBe('svg');
  });

  it('should match the snapshot', () => {
    const HouseSVG = buildLucideIconNode(House);

    expect(JSON.stringify(HouseSVG.at(1))).toMatchSnapshot();
  });

  it('should override dimensions, but not viewBox', () => {
    const HouseSVG = buildLucideIconNode(House, { size: 12 });

    expect(HouseSVG[1]['width']).toBe('12');
    expect(HouseSVG[1]['height']).toBe('12');
    expect(HouseSVG[1]['viewBox']).toBe('0 0 24 24');
  });

  it('should override width, but not height', () => {
    const HouseSVG = buildLucideIconNode(House, { width: 12 });

    expect(HouseSVG[1]['width']).toBe('12');
    expect(HouseSVG[1]['height']).toBe('24');
    expect(HouseSVG[1]['viewBox']).toBe('0 0 24 24');
  });

  it('should override height, but not width', () => {
    const HouseSVG = buildLucideIconNode(House, { height: 12 });

    expect(HouseSVG[1]['width']).toBe('24');
    expect(HouseSVG[1]['height']).toBe('12');
    expect(HouseSVG[1]['viewBox']).toBe('0 0 24 24');
  });

  it('should override color', () => {
    const HouseSVG = buildLucideIconNode(House, { color: 'pink' });

    expect(HouseSVG[1]['stroke']).toBe('pink');
    expect(HouseSVG[1]['fill']).toBe('none');
  });

  it('should override stroke width', () => {
    const HouseSVG = buildLucideIconNode(House, { strokeWidth: 12 });

    expect(HouseSVG[1]['stroke-width']).toBe('12');
  });

  it('should set non-scaling-stroke to child nodes', () => {
    const HouseSVG = buildLucideIconNode(House, { absoluteStrokeWidth: true });

    for (const node of HouseSVG[2]!) {
      expect(node[1]['vector-effect']).toBe('non-scaling-stroke');
    }
  });

  it('should not set non-scaling-stroke', () => {
    const HouseSVG = buildLucideIconNode(House, { absoluteStrokeWidth: false });

    expect(HouseSVG[1]['vector-effect']).toBeUndefined();
  });

  it('should create icon node with attributes', () => {
    const HouseSVG = buildLucideIconNode(House, { attributes: { fill: 'red' } });

    expect(HouseSVG[1]['fill']).toBe('red');
  });

  it('should create icon node with class name', () => {
    const HouseSVG = buildLucideIconNode(House, { attributes: { class: 'icon' } });

    expect(HouseSVG[1]['class']).toBe('icon');
  });

  it('should merge classes', () => {
    const HouseSVG = buildLucideIconNode(House, { className: 'icon' });

    expect(HouseSVG[1]['class']).toBe('lucide lucide-house icon');
  });
});
