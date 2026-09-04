import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-react-native';

vi.mock('react-native-svg');

describe('Using Icon Component', () => {
  const airVentIcon = { name: 'air-vent', node: airVent };

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

  it('should render icon based on icon data', async () => {
    const { container } = render(
      <Icon
        icon={airVentIcon}
        size={48}
        stroke="red"
      />,
    );

    expect(container.firstChild).toBeDefined();
  });

  it('should support nonScalingStroke', async () => {
    const { container } = render(
      <Icon
        icon={airVentIcon}
        size={48}
        stroke="red"
        strokeWidth={2}
        nonScalingStroke
      />,
    );

    expect(container.firstChild?.firstChild).toHaveAttribute('vector-effect', 'non-scaling-stroke');
  });
});
