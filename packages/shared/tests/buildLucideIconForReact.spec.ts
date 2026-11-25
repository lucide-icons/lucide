import { describe, expect, it } from 'vitest';
import buildLucideIconForReact from '../src/build/buildLucideIconForReact';
import defaultReactAttributes from '../src/build/defaultReactAttributes';
import type { LucideIconData, LucideIconNode, SVGProps } from '../src/build/types';

const icon: LucideIconData = {
  name: 'house',
  size: 24,
  node: [['path', { d: 'M0 0h1' }]],
};

const childrenOf = (node: LucideIconNode) => (node.at(2) ?? []) as LucideIconNode[];

describe('buildLucideIconForReact', () => {
  it('uses the React spelling for the hyphenated SVG attributes', () => {
    const [, attributes] = buildLucideIconForReact(icon);

    expect(attributes).toMatchObject({
      strokeWidth: defaultReactAttributes.strokeWidth,
      strokeLinecap: defaultReactAttributes.strokeLinecap,
      strokeLinejoin: defaultReactAttributes.strokeLinejoin,
      className: 'lucide lucide-house',
    });

    expect(attributes).not.toHaveProperty('stroke-width');
    expect(attributes).not.toHaveProperty('stroke-linecap');
    expect(attributes).not.toHaveProperty('stroke-linejoin');
    expect(attributes).not.toHaveProperty('class');
  });

  it('leaves the attributes React already accepts untouched', () => {
    const [, attributes] = buildLucideIconForReact(icon);

    expect(attributes).toMatchObject({
      xmlns: defaultReactAttributes.xmlns,
      width: defaultReactAttributes.width,
      height: defaultReactAttributes.height,
      viewBox: defaultReactAttributes.viewBox,
      fill: defaultReactAttributes.fill,
      stroke: defaultReactAttributes.stroke,
    });
  });

  it('keeps aria-hidden hyphenated, which is how React expects it', () => {
    const [, attributes] = buildLucideIconForReact(icon, { hasA11yProp: false });

    expect(attributes['aria-hidden']).toBe('true');
    expect(attributes).not.toHaveProperty('ariaHidden');
  });

  it('renames vector-effect on the child nodes for a non-scaling stroke', () => {
    const children = childrenOf(buildLucideIconForReact(icon, { nonScalingStroke: true }));
    const childAttributes = (children[0]?.[1] ?? {}) as SVGProps;

    expect(childAttributes.vectorEffect).toBe('non-scaling-stroke');
    expect(childAttributes).not.toHaveProperty('vector-effect');
  });

  it('merges caller attribute names but keeps its own React spellings', () => {
    const [, attributes] = buildLucideIconForReact(icon, {
      attributeNames: { fill: 'fillColor', class: 'cssClass' },
    });

    expect(attributes.fillColor).toBe(defaultReactAttributes.fill);
    expect(attributes.className).toBe('lucide lucide-house');
    expect(attributes).not.toHaveProperty('cssClass');
  });
});
