import { describe, it, expect } from 'vitest';
import { render } from 'solid-testing-library'
import { Grid } from '../src/icons'

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const { container } = render(() => <Grid /> );

    expect( container.innerHTML ).toMatchSnapshot();
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
  });
})
