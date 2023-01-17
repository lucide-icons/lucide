import { describe, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/preact'
import { Pen, Edit2, Grid } from '../src/lucide-preact';

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const { container } = render( <Grid/> );

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
    expect(attributes.stroke.value).toBe('red');
    expect(attributes.width.value).toBe('48');
    expect(attributes.height.value).toBe('48');
    expect(attributes['stroke-width'].value).toBe('4');
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
})
