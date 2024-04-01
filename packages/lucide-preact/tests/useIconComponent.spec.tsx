import { describe, it, expect } from 'vitest';
import { useIconComponent } from '../src/lucide-preact';
import { airVent, coffee } from './testIconNodes';
import { render } from '@testing-library/preact';

describe('Using iconNode component generator', () => {
  it('should create a component from an iconNode', () => {
    const { AirVent } = useIconComponent({ airVent });

    const { container } = render(<AirVent />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });

  it('should create multiple components', () => {
    const { AirVent, Coffee } = useIconComponent({ airVent, coffee });

    const { container } = render(
      <>
        <AirVent />
        <Coffee />
      </>,
    );

    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });
});
