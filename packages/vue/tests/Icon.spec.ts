import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-vue';

describe('Using Icon Component', () => {
  const airVentIcon = { name: 'air-vent', node: airVent, size: 24 };

  it('should render icon based on an icon node', async () => {
    const { container } = render(Icon, {
      props: {
        iconNode: airVent,
        name: 'AirVent',
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
      },
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render when iconNode is passed as the kebab-case icon-node prop', async () => {
    const { container } = render(Icon, {
      props: {
        'icon-node': airVent,
        name: 'AirVent',
      },
    });

    expect(container.firstChild).toBeDefined();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render icon and match snapshot', async () => {
    const { container } = render(Icon, {
      props: {
        icon: airVentIcon,
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
      },
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
