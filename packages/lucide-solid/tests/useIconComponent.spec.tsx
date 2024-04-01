import { describe, it, expect } from 'vitest';
import { useIconComponent } from '../src/lucide-solid';
import { airVent, coffee } from './testIconNodes';
import { render } from '@solidjs/testing-library';

describe('Using iconNode component generator', () => {
  it('should create a component from an iconNode', () => {
    const { AirVent } = useIconComponent({ airVent });

    const { container } = render(() => <AirVent />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });

  it('should create multiple components', () => {
    const { AirVent, Coffee } = useIconComponent({ airVent, coffee });

    const { container } = render(() => (
      <>
        <AirVent />
        <Coffee color="blue" />
      </>
    ));

    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });
});
