import { describe, it, expect } from 'vitest';
import { airVent } from './testIconNodes';
import { createAstroHTMLString, render } from './utils';
import { Icon, Rocket } from '../src/lucide-astro';

describe('Using Icon Component', async () => {
  const { container } = await render(Icon, {
    props: { iconNode: airVent, size: 48, stroke: 'red', absoluteStrokeWidth: true },
  });

  it('should render icon and match snapshot', async () => {
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render icon based on a iconNode', async () => {
    expect(container.innerHTML).toBeDefined();
  });
});

describe('Icon Component Accessibility', () => {
  it('should have aria-hidden prop when no aria prop is present', async () => {
    const { container } = await render(Icon, {
      props: {
        iconNode: airVent,
        size: 48,
        stroke: 'red',
        absoluteStrokeWidth: true,
      },
    });

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('should not have aria-hidden prop when aria prop is present', async () => {
    const { container } = await render(Rocket, {
      props: {
        size: 48,
        stroke: 'red',
        absoluteStrokeWidth: true,
        'aria-label': 'Release icon',
      },
    });

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should not have aria-hidden prop when title prop is present', async () => {
    const { container } = await render(Rocket, {
      props: {
        size: 48,
        stroke: 'red',
        absoluteStrokeWidth: true,
        title: 'Release icon',
      },
    });

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should not have aria-hidden prop when there are children in the default slot', async () => {
    const { container } = await render(Icon, {
      props: {
        iconNode: airVent,
        size: 48,
        stroke: 'red',
        absoluteStrokeWidth: true,
      },
      slots: {
        default: createAstroHTMLString('<title>Air conditioning</title>'),
      },
    });

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
    expect(container.querySelector('title')).toHaveTextContent('Air conditioning');
  });

  it('should keep aria-hidden prop when the default slot is empty whitespace', async () => {
    const { container } = await render(Icon, {
      props: {
        iconNode: airVent,
      },
      slots: {
        default: createAstroHTMLString('   '),
      },
    });

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
