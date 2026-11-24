import { describe, it, expect } from 'vitest';
import { airVent } from './testIconNodes';
import { createAstroHTMLString, render } from './utils';
import { Icon, Rocket, Scan, User } from '../src/lucide-astro';

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

  it('should not have aria-hidden prop when there is a title child in the default slot', async () => {
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

  it('should keep aria-hidden prop when combining icons without a title child', async () => {
    const { html: innerSvg } = await render(User, {
      props: {
        size: 12,
        x: 6,
        y: 6,
        nonScalingStroke: true,
      },
    });
    const { container } = await render(Scan, {
      props: {
        size: 48,
        nonScalingStroke: true,
      },
      slots: {
        default: createAstroHTMLString(innerSvg),
      },
    });

    const outerSvg = container.firstElementChild;
    const nestedSvg = outerSvg?.querySelector('svg');
    expect(outerSvg).toHaveAttribute('aria-hidden', 'true');
    expect(nestedSvg).toHaveAttribute('x', '6');
    expect(nestedSvg).toHaveAttribute('y', '6');
    expect(nestedSvg).toHaveAttribute('width', '12');
    expect(nestedSvg).toHaveAttribute('aria-hidden', 'true');
  });

  it('should omit aria-hidden when combining icons with a direct title child or aria-label', async () => {
    const { html: innerSvg } = await render(User, {
      props: {
        size: 12,
        x: 6,
        y: 6,
      },
    });

    const withTitle = await render(Scan, {
      props: { size: 48 },
      slots: {
        default: createAstroHTMLString(`${innerSvg}<title>Scan user</title>`),
      },
    });
    expect(withTitle.container.firstElementChild).not.toHaveAttribute('aria-hidden');
    expect(withTitle.container.querySelector('title')).toHaveTextContent('Scan user');

    const withAriaLabel = await render(Scan, {
      props: {
        size: 48,
        'aria-label': 'Scan user',
      },
      slots: {
        default: createAstroHTMLString(innerSvg),
      },
    });
    expect(withAriaLabel.container.firstElementChild).not.toHaveAttribute('aria-hidden');
    expect(withAriaLabel.container.firstElementChild).toHaveAttribute('aria-label', 'Scan user');
  });

  it('should keep aria-hidden prop for non-title elements, comments, and nested svg titles', async () => {
    const cases = [
      '<circle r="3" cx="21" cy="5" />',
      '<p title="tooltip">Text</p>',
      '<!-- <title>Commented title</title> -->',
      '<svg><title>Nested icon title</title></svg>',
      '   ',
    ];

    for (const slotHtml of cases) {
      const { container } = await render(Icon, {
        props: {
          iconNode: airVent,
        },
        slots: {
          default: createAstroHTMLString(slotHtml),
        },
      });

      expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
