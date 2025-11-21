import { render } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { House, LucideProvider } from '../src/lucide-solid';

describe('Using LucideProvider', () => {
  it('should render the icon with LucideProvider', () => {
    const { container } = render(() => (
      <LucideProvider
        size={48}
        color="red"
      >
        <House />
      </LucideProvider>
    ));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the icon with LucideProvider and custom strokeWidth', () => {
    const { container } = render(() => (
      <LucideProvider
        size={48}
        color="red"
        strokeWidth={4}
      >
        <House />
      </LucideProvider>
    ));

    const IconComponent = container.firstElementChild;

    expect(IconComponent).toHaveAttribute('width', '48');
    expect(IconComponent).toHaveAttribute('height', '48');
    expect(IconComponent).toHaveAttribute('stroke', 'red');
    expect(IconComponent).toHaveAttribute('stroke-width', '4');
  });
});
