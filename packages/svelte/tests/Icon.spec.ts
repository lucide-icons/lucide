import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Icon from '../src/Icon.svelte';
import TestSlotsTitle from './TestSlotsTitle.svelte';

import { airVent } from './testIconNodes.js';

describe('Using Icon Component', () => {
  it('should render icon based on a iconNode', async () => {
    const { container } = render(Icon, {
      props: {
        iconNode: airVent,
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
      },
    });

    expect(container.firstChild).toBeDefined();
  });

  it('should render icon and match snapshot', async () => {
    const { container } = render(Icon, {
      props: {
        iconNode: airVent,
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
      },
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Icon Component Accessibility', () => {
  it('should have aria-hidden prop when no aria prop is present', async () => {
    const { container } = render(Icon, {
      props: {
        iconNode: airVent,
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
      },
    });

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('should not have aria-hidden prop when aria prop is present', async () => {
    const { container } = render(Icon, {
      props: {
        iconNode: airVent,
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
        'aria-label': 'Air conditioning',
      },
    });

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should not have aria-hidden prop when title prop is present', async () => {
    const { container } = render(Icon, {
      props: {
        iconNode: airVent,
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
        title: 'Air conditioning',
      },
    });

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should not have aria-hidden prop when there are children that could be a <title> element', async () => {
    const { container } = render(TestSlotsTitle, {
      props: {
        iconNode: airVent,
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
        'aria-label': 'Air conditioning',
      },
    });

    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('should override aria-hidden prop', async () => {
    const { container } = render(Icon, {
      props: {
        iconNode: airVent,
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
        'aria-hidden': 'false',
      },
    });

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'false');
  });
});
