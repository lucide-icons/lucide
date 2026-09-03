import { describe, it, expect } from 'vitest';
import { createLucideIcon } from '../src/lucide-preact';
import { __iconNode } from '../src/icons/air-vent';
import { airVent } from './testIconNodes';
import { render } from '@testing-library/preact';

describe('Using createLucideIcon', () => {
  it('should export __iconNode from icon module', () => {
    expect(__iconNode).toBeDefined();
    expect(Array.isArray(__iconNode)).toBe(true);
    expect(__iconNode.length).toBeGreaterThan(0);
  });

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
