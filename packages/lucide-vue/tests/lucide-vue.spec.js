import { mount } from '@vue/test-utils'
import { Smile } from '..'

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const wrapper = mount(Smile)
    expect(wrapper).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const wrapper = mount(Smile, {
      propsData: {
        size: 48,
        stroke: 'red',
        strokeWidth: 4
      }
    })

    expect(wrapper).toMatchSnapshot();
  });
});
