import { describe, it, expect } from 'vitest';
import { createLucideIcon } from '../src/lucide-astro';
import { airVent } from './testIconNodes';
import { render } from './utils';

describe('Using createLucideIcon', () => {
  it('should create a component from an iconNode', async () => {
    const AirVent = createLucideIcon('AirVent', airVent);
    const { container } = await render(AirVent);

    expect(container.innerHTML).toBeDefined();
    expect(container.innerHTML).toMatchSnapshot();
  });
});
