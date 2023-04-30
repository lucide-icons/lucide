import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cleanup, render } from '@testing-library/react'
import { Edit2, Grid, Pen } from '../src/lucide-react-native'

vi.mock('react-native-svg')

type Attributes = Record<string, { value: unknown}>

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const { container } = render(<Grid /> );

    expect( container.innerHTML ).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const testId = 'grid-icon';
    const { container, getByTestId } = render(
      <Grid
        data-testid={testId}
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    const { attributes } = getByTestId(testId);
    expect((attributes as unknown as Attributes).stroke.value).toBe('red');
    expect((attributes as unknown as Attributes).width.value).toBe('48');
    expect((attributes as unknown as Attributes).height.value).toBe('48');
    expect((attributes as unknown as Attributes)['stroke-width'].value).toBe('4');

    expect( container.innerHTML ).toMatchSnapshot();
  });

  it('should render the alias icon', () => {
    const testId = 'pen-icon';
    const { container } = render(
      <Pen
        data-testid={testId}
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    const PenIconRenderedHTML = container.innerHTML

    cleanup()

    const { container: Edit2Container } = render(
      <Edit2
        data-testid={testId}
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    expect(PenIconRenderedHTML).toBe(Edit2Container.innerHTML)
  });


  it('should not scale the strokeWidth when absoluteStrokeWidth is set', () => {
    const testId = 'grid-icon';
    const { container, getByTestId } = render(
      <Grid
        data-testid={testId}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    const { attributes } = getByTestId(testId) as unknown as{ attributes: Record<string, { value: string }>};
    expect(attributes.stroke.value).toBe('red');
    expect(attributes.width.value).toBe('48');
    expect(attributes.height.value).toBe('48');
    expect(attributes['stroke-width'].value).toBe('1');

    expect( container.innerHTML ).toMatchSnapshot();
  });

  it('should work with a single child component', () => {
    const testId = "single-child";
    const childId = "child";

    const { container, getByTestId } = render(
      <Grid data-testid={testId}>
        <Grid data-testid={childId}/>
      </Grid>
    );
    const { children} = getByTestId(testId) as unknown as{ children: HTMLCollection};
    const lastChild = children[children.length -1];

    expect(lastChild).toEqual(getByTestId(childId));
    expect(container.innerHTML).toMatchSnapshot();
  })

  it('should work with several children components', () => {
    const testId = "multiple-children";
    const childId1 = "child1";
    const childId2 = "child2";

    const { container, getByTestId } = render(
      <Grid data-testid={testId}>
        <Grid data-testid={childId1}/>
        <Grid data-testid={childId2}/>
      </Grid>
    );
    const {children} = getByTestId(testId) as unknown as{ children: HTMLCollection};
    const child1 = children[children.length - 2];
    const child2 = children[children.length - 1];

    expect(child1).toEqual(getByTestId(childId1));
    expect(child2).toEqual(getByTestId(childId2));
    expect(container.innerHTML).toMatchSnapshot();
  })
})
