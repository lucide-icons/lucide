import { describe, it, expect } from 'vitest';
import { act, render, waitFor, type RenderResult } from '@testing-library/react';

import DynamicIcon from '../src/DynamicIcon';

describe('Using DynamicIcon Component', () => {
  it('should render icon by given name', async () => {
    let container: RenderResult['container'];

    await act(async () => {
      const result = render(<DynamicIcon name="smile" />);

      container = result.container;
    });

    await waitFor(() => {
      // I'd look for a real text here that is renderer when the data loads
      expect(container.firstChild).not.toBeNull();
    });
  });

  it('should render icon by alias name', async () => {
    let container: RenderResult['container'];

    await act(async () => {
      const result = render(<DynamicIcon name="home" />);

      container = result.container;
    });

    await waitFor(() => {
      // I'd look for a real text here that is renderer when the data loads
      expect(container.firstChild).not.toBeNull();
    });
  });

  it('should render icon and match snapshot', async () => {
    const { container } = render(<DynamicIcon name="circle" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should adjust the style based', async () => {
    const { container } = render(
      <DynamicIcon
        name="circle"
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
