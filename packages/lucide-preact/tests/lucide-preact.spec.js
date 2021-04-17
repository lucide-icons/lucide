import { h } from 'preact'
import { render } from '@testing-library/preact'
import { Grid } from '../src/icons'

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const { container } = render( <Grid/> );

    expect( container.innerHTML ).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const { container } = render(
      <Grid
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    expect( container.innerHTML ).toMatchSnapshot();
  });
})
