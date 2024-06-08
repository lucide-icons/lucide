import { describe, it, expect } from 'vitest';
import { getAllByRole, render } from '@testing-library/react';

import { airVent, airVentNotKeys } from './testIconNodes';
import { Icon } from '../src/lucide-react';

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

  it('Should automatically assign key if key not exists', async () => {
    const { container } = render(
      <Icon
        iconNode={airVentNotKeys}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    container.firstChild?.childNodes.forEach((child, index) => {
      Object.values(child).forEach((node) => {
        if ('elementType' in node) {
          expect(node.key).toBe(index.toString());
        }
      });
    });
  });

  it('Should not automatically assign key if key already exists', async () => {
    const { container } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    container.firstChild?.childNodes.forEach((child, index) => {
      Object.values(child).forEach((node) => {
        if ('elementType' in node) {
          expect(node.key).not.toBe(index.toString());
        }
      });
    });
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
