import { describe, it, expect } from 'vitest';
import { Pen, Edit2, Grid, Droplet, Smile, Rocket } from '../src/lucide-astro';
import defaultAttributes from '../src/defaultAttributes';
import { createAstroHTMLString, render } from './utils';

describe('Using lucide icon components', () => {
  it('should render a component', async () => {
    const { container } = await render(Grid);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render the icon with default attributes', async () => {
    const { container } = await render(Grid);
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

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', async () => {
    const { container } = await render(Grid, {
      props: {
        size: 48,
        stroke: 'red',
        'stroke-width': 4,
      },
    });

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('stroke', 'red');
    expect(SVGElement).toHaveAttribute('width', '48');
    expect(SVGElement).toHaveAttribute('stroke-width', '4');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render the alias icon', async () => {
    const { container: PenIconContainer } = await render(Pen, {
      props: {
        size: 48,
        stroke: 'red',
        'stroke-width': 4,
      },
    });

    const { container: Edit2Container } = await render(Edit2, {
      props: {
        size: 48,
        stroke: 'red',
        'stroke-width': 4,
      },
    });

    expect(PenIconContainer.innerHTML).toBe(Edit2Container.innerHTML);
  });

  it('should not scale the strokeWidth when absoluteStrokeWidth is set', async () => {
    const { container } = await render(Grid, {
      props: {
        size: 48,
        stroke: 'red',
        absoluteStrokeWidth: true,
      },
    });

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('stroke', 'red');
    expect(SVGElement).toHaveAttribute('width', '48');
    expect(SVGElement).toHaveAttribute('height', '48');
    expect(SVGElement).toHaveAttribute('stroke-width', '1');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should add a non-default attribute to the element', async () => {
    const { container } = await render(Smile, {
      props: {
        style: 'position: absolute',
      },
    });

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('style', 'position: absolute');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should pass children to the icon slot', async () => {
    const { getByText, container } = await render(Smile, {
      slots: {
        default: createAstroHTMLString('<p>Hello World</p>'),
      },
    });

    const textElement = getByText('Hello World');

    expect(textElement).toBeInTheDocument();

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should apply all classes to the element', async () => {
    const { container } = await render(Droplet, {
      props: {
        class: 'my-icon',
      },
    });
    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveClass('my-icon');
    expect(SVGElement).toHaveClass('lucide');
    expect(SVGElement).toHaveClass('lucide-droplet');

    expect(container.innerHTML).toMatchSnapshot();
  });
});
