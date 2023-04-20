import { describe, it, expect } from 'vitest';
import { cleanup, render } from 'solid-testing-library'
import { Edit2, Grid, Pen } from '../src/lucide-solid'

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const { container } = render(() => <Grid /> );

    expect( container.innerHTML ).toMatchSnapshot();
    cleanup()
  });

  it('should adjust the size, stroke color and stroke width', async () => {
    const testId = 'grid-icon';
    const { container, getByTestId } = render(() =>
      <Grid
        data-testid={testId}
        size={48}
        color="red"
        strokeWidth={4}
      />,
    );

    const { attributes } = await getByTestId(testId) as unknown as{ attributes: Record<string, { value: string }>};
    expect(attributes.stroke.value).toBe('red');
    expect(attributes.width.value).toBe('48');
    expect(attributes.height.value).toBe('48');
    expect(attributes['stroke-width'].value).toBe('4');
    expect( container.innerHTML ).toMatchSnapshot();
    cleanup()
  });

  it('should render the alias icon', () => {
    const testId = 'pen-icon';
    const { container } = render(() =>
      <Pen
        data-testid={testId}
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    const PenIconRenderedHTML = container.innerHTML

    cleanup()

    const { container: Edit2Container } = render(() =>
      <Edit2
        data-testid={testId}
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    expect(PenIconRenderedHTML).toBe(Edit2Container.innerHTML)
    cleanup()
  });


  it('should not scale the strokeWidth when absoluteStrokeWidth is set', () => {
    const testId = 'grid-icon';
    const { container, getByTestId } = render(() =>
      <Grid
        data-testid={testId}
        size={48}
        color="red"
        absoluteStrokeWidth
      />,
    );

    const { attributes } = getByTestId(testId) as unknown as{ attributes: Record<string, { value: string }>};
    expect(attributes.stroke.value).toBe('red');
    expect(attributes.width.value).toBe('48');
    expect(attributes.height.value).toBe('48');
    expect(attributes['stroke-width'].value).toBe('1');

    expect( container.innerHTML ).toMatchSnapshot();
    cleanup()
  });
})
