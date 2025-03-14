import { describe, it, expect } from 'vitest';
import { airVent } from './testIconNodes';
import { render } from './utils';
import { Icon } from '../src/lucide-astro';

describe('Using Icon Component', async () => {
  const { container } = await render(Icon, {
    props: { iconNode: airVent, size: 48, stroke: 'red', absoluteStrokeWidth: true },
  });

  it('should render icon and match snapshot', async () => {
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render icon based on a iconNode', async () => {
    expect(container.innerHTML).toBeDefined();
  });
});
