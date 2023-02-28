import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { Smile } from '../src/icons'
import TestSlots from './TestSlots.svelte'

describe('Using lucide icon components', () => {
  afterEach(() => cleanup())
  it('should render an component', () => {
    const { container } = render(Smile);
    expect(container).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const { container } = render(Smile, {
      props: {
        size: 48,
        color: 'red',
        strokeWidth: 4
      }
    });

    expect(container).toMatchSnapshot();
  });

  it('should add a class to the element', () => {
    render(Smile, {
      props: {
        class: "my-icon"
      }
    });

    const [icon] = document.getElementsByClassName('my-icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toMatchSnapshot();
    expect(icon.getAttribute("class")).toBe(['lucide-icon','lucide','lucide-smile', 'my-icon'].join(' '));
  });

  it('should add a style attribute to the element', () => {
    render(Smile, {
      props: {
        style: "position: absolute;"
      }
    });
    const [icon] = document.getElementsByClassName('lucide');

    expect(icon.getAttribute('style')).toContain('position: absolute');
  });

  it('should render an icon slot', () => {
    const { container, getByText } = render(TestSlots);

    const textElement = getByText('Test');
    expect(textElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
