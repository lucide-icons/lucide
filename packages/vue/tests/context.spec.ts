import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
// @ts-ignore
import ContextWrapper from './ContextWrapper.vue';

describe('Using lucide icon context', () => {
  it('should render the icon with LucideProvider', () => {
    const { container } = render(ContextWrapper);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the icon with LucideProvider and custom strokeWidth', () => {
    const { container } = render(ContextWrapper);

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '4');
  });

  it('should render the icon with LucideProvider and custom absoluteStrokeWidth', () => {
    const { container } = render(ContextWrapper);

    const IconComponent = container.firstElementChild;
    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '4');
  });

  it("should override the provider's global props when passing props to the icon", () => {
    const { container } = render(ContextWrapper, {
      props: {
        strokeWidth: 1,
        color: 'blue',
        size: 24,
      },
    });

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '24');
    expect(IconComponent).toHaveAttribute('height', '24');
    expect(IconComponent).toHaveAttribute('stroke', 'blue');
    expect(IconComponent).toHaveAttribute('stroke-width', '1');
  });

  it('should merge className from provider and icon', () => {
    const { container } = render(ContextWrapper, {
      props: {
        class: 'icon-class',
      },
    });

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute(
      'class',
      'lucide provider-class lucide-house-icon lucide-house icon-class',
    );
  });
});
