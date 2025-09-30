import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { Icon } from '../src/lucide-svelte.js';

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
