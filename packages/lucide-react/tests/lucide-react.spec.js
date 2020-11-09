import React from 'react';
import renderer from 'react-test-renderer';
import { Grid } from '..'

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const component = renderer.create(
      <Grid/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const component = renderer.create(
      <Grid
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})
