import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-react';

describe('Using Icon Component', () => {
  it('should render icon based on a iconNode', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    expect(container.firstChild).toBeDefined();
  });

  it('should render icon and match snapshot', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Icon Component static icon data', () => {
  it('should render nested icon nodes', () => {
    const { container } = render(
      <Icon
        icon={{
          name: 'nested',
          size: 24,
          node: [['g', { fill: 'red' }, [['path', { d: 'M6 8h12' }]]]],
        }}
      />,
    );

    expect(container.querySelector('svg > g > path')).toHaveAttribute('d', 'M6 8h12');
  });

  it('should add and remove the non scaling stroke on the same icon', () => {
    const { container, rerender } = render(<Icon iconNode={airVent} />);
    const getVectorEffects = () =>
      Array.from(container.querySelectorAll('svg > *')).map((child) =>
        child.getAttribute('vector-effect'),
      );

    expect(getVectorEffects()).toEqual([null, null, null, null]);

    rerender(
      <Icon
        iconNode={airVent}
        nonScalingStroke
      />,
    );
    expect(getVectorEffects()).toEqual(Array(4).fill('non-scaling-stroke'));

    rerender(<Icon iconNode={airVent} />);
    expect(getVectorEffects()).toEqual([null, null, null, null]);
  });

  it('should keep the rendered elements when props change', () => {
    const { container, rerender } = render(<Icon iconNode={airVent} />);
    const svg = container.firstChild;
    const paths = Array.from(container.querySelectorAll('path'));

    rerender(
      <Icon
        iconNode={airVent}
        size={48}
        className="large"
      />,
    );

    expect(container.firstChild).toBe(svg);
    expect(Array.from(container.querySelectorAll('path'))).toEqual(paths);
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveClass('lucide', 'large');
  });

  it('should render the same icon data with different props independently', () => {
    const { container } = render(
      <>
        <Icon
          iconNode={airVent}
          size={16}
          className="small"
        />
        <Icon
          iconNode={airVent}
          nonScalingStroke
        />
      </>,
    );
    const [small, nonScaling] = Array.from(container.querySelectorAll('svg'));

    expect(small).toHaveAttribute('width', '16');
    expect(small).toHaveClass('small');
    expect(small.querySelector('[vector-effect]')).toBeNull();
    expect(nonScaling).toHaveAttribute('width', '24');
    expect(nonScaling).not.toHaveClass('small');
    expect(nonScaling.querySelectorAll('[vector-effect]')).toHaveLength(4);
  });

  it('should render user children after the icon nodes', () => {
    const { container } = render(
      <Icon iconNode={airVent}>
        <title>Air vent</title>
        <circle r="1" />
      </Icon>,
    );

    expect(Array.from(container.querySelectorAll('svg > *')).map((child) => child.tagName)).toEqual(
      ['path', 'path', 'path', 'path', 'title', 'circle'],
    );
  });
});

describe('Icon Component Accessibility', () => {
  it('should have aria-hidden prop when no aria prop is present', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('should not have aria-hidden prop when aria prop is present', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
        aria-label="Air conditioning"
      />,
    );

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should not have aria-hidden prop when title prop is present', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
        // @ts-expect-error
        title="Air conditioning"
      />,
    );

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should not have aria-hidden prop when there are children that could be a <title> element', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      >
        <title>Some title</title>
      </Icon>,
    );

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should never override aria-hidden prop', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
        aria-hidden={false}
      />,
    );

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'false');
  });
});
