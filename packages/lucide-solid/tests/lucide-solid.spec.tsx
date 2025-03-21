import { describe, it, expect } from 'vitest';
import { render, cleanup } from '@solidjs/testing-library';
import { Edit2, Grid, Pen, Droplet } from '../src/lucide-solid';

describe('Using lucide icon components', () => {
  it('should render a component', () => {
    const { container } = render(() => <Grid />);

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', async () => {
    const { container, getByTestId } = render(() => (
      <Grid
        size={48}
        color="red"
        strokeWidth={4}
      />
    ));

    const gridIcon = container.firstChild as SVGElement;

    expect(gridIcon).toHaveAttribute('width', '48');
    expect(gridIcon).toHaveAttribute('height', '48');
    expect(gridIcon).toHaveAttribute('stroke', 'red');
    expect(gridIcon).toHaveAttribute('stroke-width', '4');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render the alias icon', () => {
    const { container } = render(() => (
      <Pen
        size={48}
        stroke="red"
        strokeWidth={4}
      />
    ));

    const PenIconRenderedHTML = container.innerHTML;

    cleanup();

    const { container: Edit2Container } = render(() => (
      <Edit2
        size={48}
        stroke="red"
        strokeWidth={4}
      />
    ));

    expect(PenIconRenderedHTML).toBe(Edit2Container.innerHTML);
  });

  it('should render the alias icon name classNames', () => {
    const { container } = render(() => (
      <Pen />
    ));

    const PenIcon = container.firstChild;

    expect(PenIcon).toHaveClass('lucide-edit-2');
  })

  it('should not scale the strokeWidth when absoluteStrokeWidth is set', () => {
    const { container, getByTestId } = render(() => (
      <Grid
        size={48}
        color="red"
        absoluteStrokeWidth
      />
    ));

    const gridIcon = container.firstChild as SVGElement;

    expect(gridIcon).toHaveAttribute('stroke-width', '1');
    expect(gridIcon).toHaveAttribute('width', '48');
    expect(gridIcon).toHaveAttribute('height', '48');
    expect(gridIcon).toHaveAttribute('stroke', 'red');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should add all classes to the element', () => {
    const testClass = 'my-class';
    const { container } = render(() => <Droplet class={testClass} />);

    expect(container.firstChild).toHaveClass(testClass);
    expect(container.firstChild).toHaveClass('lucide');
    expect(container.firstChild).toHaveClass('lucide-droplet');
  });
});
