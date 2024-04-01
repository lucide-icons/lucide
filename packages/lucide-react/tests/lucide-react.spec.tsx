import { describe, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { Pen, Edit2, Grid, Droplet } from '../src/lucide-react';
import defaultAttributes from '../src/defaultAttributes';

describe('Using lucide icon components', () => {
  it('should render an component', () => {
    const { container } = render(<Grid />);

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render the icon with default attributes', () => {
    const { container } = render(<Grid />);

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('xmlns', defaultAttributes.xmlns);
    expect(SVGElement).toHaveAttribute('width', String(defaultAttributes.width));
    expect(SVGElement).toHaveAttribute('height', String(defaultAttributes.height));
    expect(SVGElement).toHaveAttribute('viewBox', defaultAttributes.viewBox);
    expect(SVGElement).toHaveAttribute('fill', defaultAttributes.fill);
    expect(SVGElement).toHaveAttribute('stroke', defaultAttributes.stroke);
    expect(SVGElement).toHaveAttribute('stroke-width', String(defaultAttributes.strokeWidth));
    expect(SVGElement).toHaveAttribute('stroke-linecap', defaultAttributes.strokeLinecap);
    expect(SVGElement).toHaveAttribute('stroke-linejoin', defaultAttributes.strokeLinejoin);
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const { container } = render(
      <Grid
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('stroke', 'red');
    expect(SVGElement).toHaveAttribute('width', '48');
    expect(SVGElement).toHaveAttribute('height', '48');
    expect(SVGElement).toHaveAttribute('stroke-width', '4');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render the alias icon', () => {
    const { container } = render(
      <Pen
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    const PenIconRenderedHTML = container.innerHTML;

    cleanup();

    const { container: Edit2Container } = render(
      <Edit2
        size={48}
        stroke="red"
        strokeWidth={4}
      />,
    );

    expect(PenIconRenderedHTML).toBe(Edit2Container.innerHTML);
  });

  it('should not scale the strokeWidth when absoluteStrokeWidth is set', () => {
    const { container, getByTestId } = render(
      <Grid
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    const SVGElement = container.firstElementChild;

    expect(SVGElement).toHaveAttribute('stroke', 'red');
    expect(SVGElement).toHaveAttribute('width', '48');
    expect(SVGElement).toHaveAttribute('height', '48');
    expect(SVGElement).toHaveAttribute('stroke-width', '1');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should apply all classNames to the element', () => {
    const testClass = 'my-class';
    const { container } = render(<Droplet className={testClass} />);

    expect(container.firstChild).toHaveClass(testClass);
    expect(container.firstChild).toHaveClass('lucide');
    expect(container.firstChild).toHaveClass('lucide-droplet');
  });
});
