import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react'
import { Grid } from '../src/icons'

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
})
