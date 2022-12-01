import { describe, it, expect, vi, afterEach } from 'vitest';
import {render, fireEvent, cleanup } from '@testing-library/vue'
import { Smile } from '../src/icons'

describe('Using lucide icon components', () => {
  afterEach(() => cleanup())

  it('should render an component', () => {
    const { container } = render(Smile)
    expect(container).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const {container} = render(Smile, {
      props: {
        size: 48,
        color: 'red',
        'stroke-width': 4
      }
    })

    const [icon] = document.getElementsByClassName('lucide');

    expect(icon.getAttribute('width')).toBe('48')
    expect(icon.getAttribute('stroke')).toBe('red')
    expect(icon.getAttribute('stroke-width')).toBe('4')

    expect(container).toMatchSnapshot();
  });


  it('should add a class to the element', () => {
    const {container} = render(Smile, {
      attrs: {
        class: "my-icon"
      }
    })

    expect(container).toMatchSnapshot();

    const [icon] = document.getElementsByClassName('my-icon');

    expect(icon).toHaveClass('my-icon')
  });

  it('should add a style attribute to the element', () => {
    const {container} = render(Smile, {
      attrs: {
        style: 'position: absolute',
      }
    })

    expect(container).toMatchSnapshot();

    const [icon] = document.getElementsByClassName('lucide');

    expect(icon).toHaveStyle({ position: 'absolute' })
  });

  it('should call the onClick event', async () => {
    const onClick = vi.fn()
    render(Smile, {
      attrs: {
        onClick,
      }
    })

    const [icon] = document.getElementsByClassName('lucide');

    await fireEvent.click(icon)

    expect(onClick).toHaveBeenCalled()
  });

  it('should pass children to the icon slot', () => {
    const testText = 'Hello World'
    const template = {
      name: 'Stub',
      template: `<text>${testText}</text>`
    }
    const { getByText, container } = render(Smile, {
      slots: {
        default: template
      }
    })

    const textElement = getByText(testText)

    expect(textElement).toBeInTheDocument()
    expect(container).toMatchSnapshot();
  });
});
