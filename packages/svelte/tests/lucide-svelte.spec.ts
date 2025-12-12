import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { Smile, Pen, Edit2 } from '../src/lucide-svelte.js';
import TestSlots from './TestSlots.svelte';
import ContextWrapper from './ContextWrapper.svelte';

describe('Using lucide icon components', () => {
  afterEach(() => cleanup());
  it('should render an component', () => {
    const { container } = render(Smile);
    expect(container).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const { container } = render(Smile, {
      size: 48,
      color: 'red',
      strokeWidth: 4,
    });

    expect(container).toMatchSnapshot();
  });

  it('should add a class to the element', () => {
    const testClass = 'my-icon';
    const { container } = render(Smile, {
      class: testClass,
    });

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toBeInTheDocument();
    expect(IconComponent).toMatchSnapshot();
    expect(IconComponent).toHaveClass(testClass);
    expect(IconComponent).toHaveClass('lucide');
    expect(IconComponent).toHaveClass('lucide-smile');
  });

  it('should add a style attribute to the element', () => {
    const { container } = render(Smile, {
      style: 'position: absolute;',
    });

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('style', 'position: absolute;');
  });

  it('should render an icon slot', () => {
    const { container, getByText } = render(TestSlots);

    const textElement = getByText('Test');
    expect(textElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render the alias icon', () => {
    const { container } = render(Pen);

    const PenIconRenderedHTML = container.innerHTML;

    cleanup();

    const { container: Edit2Container } = render(Edit2);

    expect(PenIconRenderedHTML).toBe(Edit2Container.innerHTML);
  });

  it('should not scale the strokeWidth when absoluteStrokeWidth is set', () => {
    const { container } = render(Smile, {
      color: 'red',
      size: 48,
      absoluteStrokeWidth: true,
    });

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '1');

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should use context values from he global set properties', () => {
    const { container } = render(ContextWrapper);

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '32');
    expect(IconComponent).toHaveAttribute('height', '32');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '1');
  });
});
