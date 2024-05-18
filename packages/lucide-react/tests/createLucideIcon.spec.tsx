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
});
