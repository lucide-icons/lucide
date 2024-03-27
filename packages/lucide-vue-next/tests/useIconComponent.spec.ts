import { describe, it, expect } from 'vitest';
import { useIconComponent } from '../src/lucide-vue-next';
import { airVent, coffee } from './testIconNodes';
import { cleanup, render } from '@testing-library/vue'

describe('Using iconNode component generator', () => {
  it('should create a component from an iconNode', () => {
    const { AirVent } = useIconComponent({ airVent })

    const { container } = render(AirVent);

    expect( container.firstChild ).toMatchSnapshot();
    expect( container.firstChild ).toBeDefined();
  });

  it('should create multiple components', () => {
    const { AirVent, Coffee } = useIconComponent({ airVent, coffee })

    const { container } = render(AirVent);
    expect( container ).toBeDefined();

    cleanup();

    const { container: container2 } = render(Coffee);
    expect( container2 ).toBeDefined();
  });
})
