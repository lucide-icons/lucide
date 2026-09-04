import { describe, it, expect } from 'vitest';
import { createLucideIcon } from '../src/lucide-preact';
import { airVent } from './testIconNodes';
import { render } from '@testing-library/preact';

describe('Using createLucideIcon', () => {
  it('should create a component from icon data', () => {
    const AirVent = createLucideIcon({
      name: 'air-vent',
      node: airVent,
    });

    const { container } = render(<AirVent />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });

  it('should include aliases from icon data', () => {
    const CircleCheck = createLucideIcon({
      name: 'circle-check',
      aliases: ['check-circle'],
      node: airVent,
    });

    const { container } = render(<CircleCheck />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });

  it('should merge className prop with icon classes', () => {
    const CircleCheck = createLucideIcon({
      name: 'circle-check',
      aliases: ['check-circle'],
      node: airVent,
    });

    const { container } = render(<CircleCheck class="custom-class" />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });

  it('should create a component from legacy icon arguments', () => {
    const AirVent = createLucideIcon('AirVent', airVent);

    const { container } = render(<AirVent />);

    expect(container.firstChild).toHaveClass('lucide-air-vent');
  });

  it('should include aliases from legacy icon arguments', () => {
    const CircleCheck = createLucideIcon('CircleCheck', airVent, ['check-circle']);

    const { container } = render(<CircleCheck />);

    expect(container.firstChild).toHaveClass('lucide-circle-check');
    expect(container.firstChild).toHaveClass('lucide-check-circle');
  });
});
