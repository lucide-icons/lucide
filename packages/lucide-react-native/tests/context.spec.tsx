import { cleanup, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { House, LucideProvider } from "../src/lucide-react-native";

vi.mock('react-native-svg');

describe('Using LucideProvider', () => {
  it('should render the icon with LucideProvider', () => {
    cleanup();
    const { container } = render(
      <LucideProvider>
        <House />
      </LucideProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the icon with LucideProvider and custom strokeWidth', () => {
    cleanup();
    const testId = 'house-icon';
    const { getByTestId } = render(
      <LucideProvider
        size={48}
        color="red"
        strokeWidth={4}
      >
        <House testID={testId} />
      </LucideProvider>
    );

    const IconComponent = getByTestId(testId);

    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '4');
  });

  it('should render the icon with LucideProvider and custom absoluteStrokeWidth', () => {
    cleanup();
      const { container } = render(
        <LucideProvider
          size={48}
          color="red"
          absoluteStrokeWidth
        >
          <House/>
        </LucideProvider>
      );

      const IconComponent = container.firstElementChild;

      expect(IconComponent).toHaveAttribute('stroke-width', '1');
    });

    it("should override the provider's global props when passing props to the icon", () => {
      cleanup();
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
        </LucideProvider>
      );

      const IconComponent = container.firstElementChild;

      expect(IconComponent).toHaveAttribute('width', '24');
      expect(IconComponent).toHaveAttribute('height', '24');
      expect(IconComponent).toHaveAttribute('stroke', 'blue');
      expect(IconComponent).toHaveAttribute('stroke-width', '2');
    }
    );
})
