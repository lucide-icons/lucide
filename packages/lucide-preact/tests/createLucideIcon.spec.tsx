import { describe, it, expect } from 'vitest';
import { createLucideIcon } from '../src/lucide-preact';
import { airVent } from './testIconNodes';
import { render } from '@testing-library/preact';

describe('Using createLucideIcon', () => {
  it('should create a component from an iconNode', () => {
    const AirVent = createLucideIcon('AirVent', airVent);

    const { container } = render(<AirVent />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });
});
