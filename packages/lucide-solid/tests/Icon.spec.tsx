import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-solid';

describe('Using Icon Component', () => {
  const airVentIcon = { name: 'air-vent', node: airVent };

  it('should render icon based on a iconNode', async () => {
    const { container } = render(() => (
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />
    ));

    expect(container.firstChild).toBeDefined();
  });

  it('should render icon and match snapshot', async () => {
    const { container } = render(() => (
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />
    ));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render icon based on icon data', async () => {
    const { container } = render(() => (
      <Icon
        icon={airVentIcon}
        size={48}
        stroke="red"
      />
    ));

    expect(container.firstChild).toBeDefined();
  });

  it('should support nonScalingStroke', async () => {
    const { container } = render(() => (
      <Icon
        icon={airVentIcon}
        size={48}
        stroke="red"
        strokeWidth={2}
        nonScalingStroke
      />
    ));

    expect(container.firstChild?.firstChild).toHaveAttribute('vector-effect', 'non-scaling-stroke');
  });
});

describe('Icon Component Accessibility', () => {
  it('should have aria-hidden prop when no aria prop is present', async () => {
    const { container } = render(() => (
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />
    ));

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('should not have aria-hidden prop when aria prop is present', async () => {
    const { container } = render(() => (
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
        aria-label="Air conditioning"
      />
    ));

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should not have aria-hidden prop when title prop is present', async () => {
    const { container } = render(() => (
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
        // @ts-expect-error
        title="Air conditioning"
      />
    ));

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should not have aria-hidden prop when there are children that could be a <title> element', async () => {
    const { container } = render(() => (
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      >
        <title>Some title</title>
      </Icon>
    ));

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should never override aria-hidden prop', async () => {
    const { container } = render(() => (
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
        aria-hidden={false}
      />
    ));

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'false');
  });
});
