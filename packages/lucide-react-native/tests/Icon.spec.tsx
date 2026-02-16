import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import { airVent } from './testIconNodes';
import { Icon } from '../src/lucide-react-native';

vi.mock('react-native-svg');

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
        className="test-class"
        data-testid="test-id"
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not apply className or data-testid to children', async () => {
    const rootClassName = 'root-class';
    const rootTestId = 'root-test-id';

    const { getByTestId } = render(
      <Icon
        iconNode={airVent}
        className={rootClassName}
        data-testid={rootTestId}
      />,
    );

    const root = getByTestId(rootTestId);
    const children = root.children;

    expect(root.classList.contains(rootClassName)).toBe(true);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      expect(child.classList.contains(rootClassName)).toBe(false);
      expect(child.getAttribute('data-testid')).not.toBe(rootTestId);
    }
  });
});
