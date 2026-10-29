import { describe, it, expect, vi } from 'vitest';
import { act, render, waitFor, type RenderResult } from '@testing-library/react';

import DynamicIcon from '../src/DynamicIcon';

const { delayedImports, pendingImports } = vi.hoisted(() => ({
  delayedImports: new Map<string, Promise<void>>(),
  pendingImports: new Map<string, Promise<unknown>>(),
}));

vi.mock('../src/dynamicIconImports', async (importOriginal) => {
  const { default: dynamicIconImports } =
    await importOriginal<typeof import('../src/dynamicIconImports')>();

  return {
    default: Object.fromEntries(
      Object.entries(dynamicIconImports).map(([name, importIcon]) => [
        name,
        () => {
          const pendingImport = (delayedImports.get(name) ?? Promise.resolve()).then(importIcon);
          pendingImports.set(name, pendingImport);

          return pendingImport;
        },
      ]),
    ),
  };
});

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

  it('should render fallback component while icon is loading', () => {
    const FallbackComponent = () => <span data-testid="fallback">Loading...</span>;
    const { getByTestId } = render(
      <DynamicIcon
        name="smile"
        fallback={FallbackComponent}
      />,
    );

    expect(getByTestId('fallback')).not.toBeNull();
  });

  it('should forward ref to the rendered svg element', async () => {
    const ref = { current: null as SVGSVGElement | null };

    await act(async () => {
      render(
        <DynamicIcon
          ref={ref}
          name="smile"
        />,
      );
    });

    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });
  });

  it('should render the latest icon when a previous icon finishes loading later', async () => {
    let resolveCameraImport = () => {};
    delayedImports.set(
      'camera',
      new Promise((resolve) => {
        resolveCameraImport = resolve;
      }),
    );

    const { container, rerender } = render(<DynamicIcon name="camera" />);
    rerender(<DynamicIcon name="smile" />);

    await waitFor(() => {
      expect(container.firstChild).toHaveClass('lucide-smile');
    });

    await act(async () => {
      resolveCameraImport();
      await pendingImports.get('camera');
      await new Promise((resolve) => setTimeout(resolve));
    });

    expect(container.firstChild).toHaveClass('lucide-smile');
    expect(container.firstChild).not.toHaveClass('lucide-camera');
  });
});
