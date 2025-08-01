import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { Smile, Pen, Edit2 } from '../src/lucide-svelte.js';
import TestSlots from './TestSlots.svelte';

describe('Using lucide icon components', () => {
  afterEach(() => cleanup());
  it('should render an component', () => {
    const { container } = render(Smile);
    expect(container).toMatchSnapshot();
  });

  it('should adjust the size, stroke color and stroke width', () => {
    const { container } = render(Smile, {
      props: {
        size: 48,
        color: 'red',
        strokeWidth: 4,
      },
    });

    expect(container).toMatchSnapshot();
  });

  it('should add a class to the element', () => {
    const testClass = 'my-icon';
    render(Smile, {
      props: {
        class: testClass,
      },
    });

    const [icon] = document.getElementsByClassName(testClass);

    expect(icon).toBeInTheDocument();
    expect(icon).toMatchSnapshot();
    expect(icon).toHaveClass(testClass);
    expect(icon).toHaveClass('lucide');
    expect(icon).toHaveClass('lucide-smile');
  });

  it('should add a style attribute to the element', () => {
    render(Smile, {
      props: {
        style: 'position: absolute;',
      },
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

  it('should render the alias icon', () => {
    const { container } = render(Pen);

    const PenIconRenderedHTML = container.innerHTML;

    cleanup();

    const { container: Edit2Container } = render(Edit2);

    expect(PenIconRenderedHTML).toBe(Edit2Container.innerHTML);
  });

  it('should not scale the strokeWidth when absoluteStrokeWidth is set', () => {
    const testId = 'smile-icon';
    const { container, getByTestId } = render(Smile, {
      'data-testid': testId,
      color: 'red',
      size: 48,
      absoluteStrokeWidth: true,
    });

    const { attributes } = getByTestId(testId) as unknown as {
      attributes: Record<string, { value: string }>;
    };
    expect(attributes.stroke.value).toBe('red');
    expect(attributes.width.value).toBe('48');
    expect(attributes.height.value).toBe('48');
    expect(attributes['stroke-width'].value).toBe('1');

    expect(container.innerHTML).toMatchSnapshot();
  });
});
