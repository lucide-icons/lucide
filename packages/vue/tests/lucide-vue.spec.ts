import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/vue';
import { Smile, Edit2, Pen } from '../src/lucide-vue';
import defaultAttributes from '../src/defaultAttributes';

describe('Using lucide icon components', () => {
  afterEach(() => cleanup());

  it('should render an component', () => {
    const { container } = render(Smile);
    expect(container).toMatchSnapshot();
  });

  it('should render the icon with the default attributes', () => {
    const { container } = render(Smile);

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('xmlns', defaultAttributes.xmlns);
    expect(SVGElement).toHaveAttribute('width', String(defaultAttributes.width));
    expect(SVGElement).toHaveAttribute('height', String(defaultAttributes.height));
    expect(SVGElement).toHaveAttribute('viewBox', defaultAttributes.viewBox);
    expect(SVGElement).toHaveAttribute('fill', defaultAttributes.fill);
    expect(SVGElement).toHaveAttribute('stroke', defaultAttributes.stroke);
    expect(SVGElement).toHaveAttribute('stroke-width', String(defaultAttributes['stroke-width']));
    expect(SVGElement).toHaveAttribute('stroke-linecap', defaultAttributes['stroke-linecap']);
    expect(SVGElement).toHaveAttribute('stroke-linejoin', defaultAttributes['stroke-linejoin']);
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const { container } = render(Smile, {
      props: {
        size: 48,
        color: 'red',
        'stroke-width': 4,
      },
    });

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('width', '48');
    expect(SVGElement).toHaveAttribute('stroke', 'red');
    expect(SVGElement).toHaveAttribute('stroke-width', '4');

    expect(container).toMatchSnapshot();
  });

  it('should add a class to the element', () => {
    const { container } = render(Smile, {
      attrs: {
        class: 'my-icon',
      },
    });

    expect(container).toMatchSnapshot();

    const icon = container.firstElementChild;

    expect(icon).toHaveClass('my-icon');
    expect(icon).toHaveClass('lucide');
    expect(icon).toHaveClass('lucide-smile-icon');
  });

  it('should add a style attribute to the element', () => {
    const { container } = render(Smile, {
      attrs: {
        style: 'position: absolute',
      },
    });

    expect(container).toMatchSnapshot();

    const icon = container.firstElementChild;

    expect(icon).toHaveStyle({ position: 'absolute' });
  });

  it('should call the onClick event', async () => {
    const onClick = vi.fn();
    const { container } = render(Smile, {
      attrs: {
        onClick,
      },
    });

    const icon = container.firstElementChild;

    await fireEvent.click(icon as Element);

    expect(onClick).toHaveBeenCalled();
  });

  it('should pass children to the icon slot', () => {
    const testText = 'Hello World';
    const template = {
      name: 'Stub',
      template: `<text>${testText}</text>`,
    };
    const { getByText, container } = render(Smile, {
      slots: {
        default: template,
      },
    });

    const textElement = getByText(testText);

    expect(textElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render the alias icon', () => {
    const { container } = render(Pen, {
      props: {
        size: 48,
        color: 'red',
        'stroke-width': 4,
      },
    });

    const PenIconRenderedHTML = container.innerHTML;

    cleanup();

    const { container: Edit2Container } = render(Edit2, {
      props: {
        size: 48,
        color: 'red',
        'stroke-width': 4,
      },
    });

    expect(PenIconRenderedHTML).toBe(Edit2Container.innerHTML);
  });

  it('should not scale the strokeWidth when absoluteStrokeWidth is set', () => {
    const { container } = render(Pen, {
      props: {
        size: 48,
        color: 'red',
        absoluteStrokeWidth: true,
      },
    });

    const icon = container.firstElementChild;

    expect(icon).toHaveAttribute('width', '48');
    expect(icon).toHaveAttribute('stroke', 'red');
    expect(icon).toHaveAttribute('stroke-width', '1');
  });

  it('should not scale the strokeWidth when absoluteStrokeWidth is as empty value attribute', () => {
    const { container } = render(Pen, {
      props: {
        size: 48,
        color: 'red',
        absoluteStrokeWidth: '',
      },
    });

    const icon = container.firstElementChild;

    expect(icon).toHaveAttribute('width', '48');
    expect(icon).toHaveAttribute('stroke', 'red');
    expect(icon).toHaveAttribute('stroke-width', '1');
  });

  it('should not scale the strokeWidth when absoluteStrokeWidth is written in kebabCase', () => {
    const { container } = render(Pen, {
      props: {
        size: 48,
        color: 'red',
        'stroke-width': '2',
        'absolute-stroke-width': '',
      },
    });

    const icon = container.firstElementChild;

    expect(icon).toHaveAttribute('width', '48');
    expect(icon).toHaveAttribute('stroke', 'red');
    expect(icon).toHaveAttribute('stroke-width', '1');
  });
});
