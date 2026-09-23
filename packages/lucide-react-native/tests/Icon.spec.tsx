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

  it('should pass the testID to the rendered element', async () => {
    const { container, getByTestId } = render(
      <Icon
        iconNode={airVent}
        testID="air-vent-icon"
      />,
    );

    expect(getByTestId('air-vent-icon')).toBe(container.firstChild);
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

  it('should not forward arbitrary rest props (e.g. onPress) to child shape elements, only to the parent Svg', async () => {
    const RNSvg = await import('react-native-svg');
    const pathSpy = vi.spyOn(RNSvg, 'Path');
    const onPress = vi.fn();

    render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        onPress={onPress}
      />,
    );

    expect(pathSpy).toHaveBeenCalled();
    for (const call of pathSpy.mock.calls) {
      const childProps = call[0] as Record<string, unknown>;
      expect(childProps.onPress).toBeUndefined();
    }
  });
});
