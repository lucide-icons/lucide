import { describe, it, expect } from 'vitest';
import { createLucideIcon } from '../src/lucide-react';
import { airVent } from './testIconNodes';
import { render } from '@testing-library/react';

describe('Using createLucideIcon', () => {
  it('should create a component from an iconNode', () => {
    const AirVent = createLucideIcon('AirVent', airVent);

    const { container } = render(<AirVent />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });

  it('should create a component from an iconNode with iconName', () => {
    const AirVent = createLucideIcon('air-vent', airVent);

    const { container } = render(<AirVent />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });

  it('should include backwards compatible className', () => {
    const Layout2 = createLucideIcon('layout-2', airVent);

    const { container } = render(<Layout2 />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });
});
