import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-react';

describe('SVG Stroke Attributes', () => {
  it('should apply strokeLinecap when provided', () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        strokeLinecap="square"
      />,
    );

    expect(container.firstChild).toHaveAttribute('stroke-linecap', 'square');
  });

  it('should apply strokeLinejoin when provided', () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        strokeLinejoin="bevel"
      />,
    );

    expect(container.firstChild).toHaveAttribute('stroke-linejoin', 'bevel');
  });

  it('should apply strokeDasharray for dashed strokes', () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        strokeDasharray="5 5"
      />,
    );

    expect(container.firstChild).toHaveAttribute('stroke-dasharray', '5 5');
  });

  it('should apply opacity when provided', () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        opacity={0.5}
      />,
    );

    expect(container.firstChild).toHaveAttribute('opacity', '0.5');
  });

  it('should preserve default attributes when no stroke props provided', () => {
    const { container } = render(<Icon iconNode={airVent} />);

    expect(container.firstChild).toHaveAttribute('stroke-linecap', 'round');
    expect(container.firstChild).toHaveAttribute('stroke-linejoin', 'round');
  });

  it('should not interfere with existing props', () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
      />,
    );

    expect(container.firstChild).toHaveAttribute('width', '48');
    expect(container.firstChild).toHaveAttribute('stroke', 'red');
  });
});
