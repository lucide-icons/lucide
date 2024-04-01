import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-preact';

describe('Using Icon Component', () => {
  it('should render icon based on a iconNode', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    expect(container.firstChild).toBeDefined();
  });

  it('should render icon and match snapshot', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
