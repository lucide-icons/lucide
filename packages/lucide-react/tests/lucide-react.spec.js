import React from 'react';
import renderer from 'react-test-renderer';
import { Grid } from '..'

// const Component = () => (
//   <div>hoi</div>
// )

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const component = renderer.create(
      <Grid/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})
