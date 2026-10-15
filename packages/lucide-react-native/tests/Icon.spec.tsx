import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-react-native';

vi.mock('react-native-svg');

describe('Using Icon Component', () => {
  afterEach(() => vi.restoreAllMocks());

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
    const svgSpy = vi.spyOn(RNSvg, 'Svg');
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

    expect(svgSpy).toHaveBeenCalled();
    const svgProps = svgSpy.mock.calls[0][0] as Record<string, unknown>;
    expect(svgProps.onPress).toBe(onPress);
  });

  it('should apply strokeLinecap and strokeLinejoin overrides to child shape elements', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />,
    );

    const { children = [] } = (container.firstChild ?? {}) as unknown as {
      children: HTMLCollection;
    };
    expect(children.length).toBeGreaterThan(0);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      expect(child.getAttribute('stroke-linecap')).toBe('butt');
      expect(child.getAttribute('stroke-linejoin')).toBe('miter');
    }
  });
});
