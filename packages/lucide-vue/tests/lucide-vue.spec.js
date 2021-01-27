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


  it('should add a class to the element', () => {
    const wrapper = mount(Smile, {
      attrs: {
        class: "my-icon"
      }
    })

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.classes()).toContain('my-icon')
  });
});
