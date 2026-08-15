import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { createSignal, flush } from 'solid-js';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-solid';

describe('Using Icon Component', () => {
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

  it('should update when reactive props change', () => {
    const [size, setSize] = createSignal(24);
    const [color, setColor] = createSignal('red');
    const { container } = render(() => (
      <Icon
        iconNode={airVent}
        size={size()}
        color={color()}
      />
    ));

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '24');
    expect(IconComponent).toHaveAttribute('height', '24');
    expect(IconComponent).toHaveAttribute('stroke', 'red');

    setSize(48);
    setColor('blue');
    flush();

    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'blue');
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
        aria-hidden="false"
      />
    ));

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'false');
  });
});
