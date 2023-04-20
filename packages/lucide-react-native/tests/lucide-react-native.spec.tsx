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
})
