import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { House, LucideProvider } from '../src/lucide-react';

describe('Using LucideProvider', () => {
  it('should render the icon with LucideProvider', () => {
    const { container } = render(
      <LucideProvider
        size={48}
        color="red"
      >
        <House />
      </LucideProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the icon with default props when no provider is used', () => {
    const { container } = render(<House />);

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '24');
    expect(IconComponent).toHaveAttribute('height', '24');
    expect(IconComponent).toHaveAttribute('stroke', 'currentColor');
    expect(IconComponent).toHaveAttribute('stroke-width', '2');
  });

  it('should render the icon with LucideProvider and custom strokeWidth', () => {
    const { container } = render(
      <LucideProvider
        size={48}
        color="red"
        strokeWidth={4}
      >
        <House />
      </LucideProvider>,
    );

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '4');
  });

  it('should render the icon with LucideProvider and custom absoluteStrokeWidth', () => {
    const { container } = render(
      <LucideProvider
        size={48}
        color="red"
        absoluteStrokeWidth
      >
        <House />
      </LucideProvider>,
    );

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('stroke-width', '1');
  });

  it("should override the provider's global props when passing props to the icon", () => {
    const { container } = render(
      <LucideProvider
        size={48}
        color="red"
        strokeWidth={4}
      >
        <House
          size={24}
          color="blue"
          strokeWidth={2}
        />
      </LucideProvider>,
    );

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '24');
    expect(IconComponent).toHaveAttribute('height', '24');
    expect(IconComponent).toHaveAttribute('stroke', 'blue');
    expect(IconComponent).toHaveAttribute('stroke-width', '2');
  });

  it('should merge className from provider and icon', () => {
    const { container } = render(
      <LucideProvider className="provider-class">
        <House className="icon-class" />
      </LucideProvider>,
    );

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('class', 'lucide provider-class lucide-house icon-class');
  });
});
