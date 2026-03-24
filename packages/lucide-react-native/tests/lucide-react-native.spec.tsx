import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { Edit2, Grid, Pen } from '../src/lucide-react-native';

vi.mock('react-native-svg');

type Attributes = Record<string, { value: unknown }>;

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const { container } = render(<Grid />);

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const testId = 'grid-icon';
    const { getByTestId } = render(
      <Grid
        size={48}
        stroke="red"
        strokeWidth={4}
        testID={testId}
      />,
    );

    const GridIcon = getByTestId(testId);

    expect(GridIcon).toHaveAttribute('stroke', 'red');
    expect(GridIcon).toHaveAttribute('width', '48');
    expect(GridIcon).toHaveAttribute('height', '48');
    expect(GridIcon).toHaveAttribute('stroke-width', '4');

    expect(GridIcon).toMatchSnapshot();
  });

  it('should render the alias icon', () => {
    const penTestId = 'pen-icon';
    const { getByTestId: getByTestId1 } = render(
      <Pen
        testID={penTestId}
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    const penIcon = getByTestId1(penTestId);

    cleanup();

    const { getByTestId: getByTestId2 } = render(
      <Edit2
        testID={penTestId}
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    const edit2Icon = getByTestId2(penTestId);

    expect(penIcon).toStrictEqual(edit2Icon);
  });

  it('should not scale the strokeWidth when absoluteStrokeWidth is set', () => {
    const { container } = render(
      <Grid
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('stroke', 'red');
    expect(SVGElement).toHaveAttribute('width', '48');
    expect(SVGElement).toHaveAttribute('height', '48');
    expect(SVGElement).toHaveAttribute('stroke-width', '1');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should work with a single child component', () => {
    const testId = 'single-child';
    const childId = 'child';

    const { container, getByTestId } = render(
      <Grid testID={testId}>
        <Grid testID={childId} />
      </Grid>,
    );
    const { children } = container.firstElementChild ?? {};
    const lastChild = children?.[children.length - 1];

    expect(lastChild).toEqual(getByTestId(childId));
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should work with several children components', () => {
    const testId = 'multiple-children';
    const childId1 = 'child1';
    const childId2 = 'child2';

    const { container, getByTestId } = render(
      <Grid testID={testId}>
        <Grid testID={childId1} />
        <Grid testID={childId2} />
      </Grid>,
    );
    const { children } = getByTestId(testId) as unknown as { children: HTMLCollection };
    const child1 = children[children.length - 2];
    const child2 = children[children.length - 1];

    expect(child1).toEqual(getByTestId(childId1));
    expect(child2).toEqual(getByTestId(childId2));
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should duplicate properties to children components', () => {
    const testId = 'multiple-children';

    const fill = 'red';
    const color = 'white';
    const strokeWidth = 10;

    const { container, getByTestId } = render(
      <Grid
        testID={testId}
        fill={fill}
        color={color}
        strokeWidth={strokeWidth}
      />,
    );
    const { children = [] } = getByTestId(testId) as unknown as { children: HTMLCollection };
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      expect(child.getAttribute('fill')).toBe(fill);
      expect(child.getAttribute('stroke')).toBe(color);
      expect(child.getAttribute('stroke-width')).toBe(`${strokeWidth}`);
    }

    expect(container.innerHTML).toMatchSnapshot();
  });
});
