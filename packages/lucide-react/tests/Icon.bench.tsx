import { describe, test } from 'vitest';
import { createElement, type ReactElement } from 'react';
// @ts-ignore react-dom ships without type declarations
import { flushSync } from 'react-dom';
// @ts-ignore react-dom ships without type declarations
import { createRoot } from 'react-dom/client';
// @ts-ignore react-dom ships without type declarations
import { renderToString } from 'react-dom/server';

import { createLucideIcon, LucideProvider } from '../src/lucide-react';
import { airVent, coffee } from './testIconNodes';

// Benchmarks drive React directly, outside of act().
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;

const COUNT = 1000;

const AirVent = createLucideIcon({ name: 'air-vent', size: 24, node: airVent });
const Coffee = createLucideIcon({ name: 'coffee', size: 24, node: coffee, aliases: ['cup'] });

const list = (props: Record<string, unknown> = {}) =>
  createElement(
    'div',
    null,
    Array.from({ length: COUNT }, (_, index) =>
      createElement(index % 2 ? AirVent : Coffee, { key: index, ...props }),
    ),
  );

const withProvider = (children: ReactElement) =>
  createElement(LucideProvider, { size: 32, color: 'red', strokeWidth: 1.5, children });

const mount = (element: ReactElement) => {
  const root = createRoot(document.createElement('div'));
  flushSync(() => root.render(element));
  root.unmount();
};

const rerenderer = (make: () => ReactElement) => {
  const root = createRoot(document.createElement('div'));
  flushSync(() => root.render(make()));

  return () => flushSync(() => root.render(make()));
};

describe(`server render of ${COUNT} icons`, () => {
  test('default props', async ({ bench }) => {
    await bench('default props', () => {
      renderToString(list());
    }).run();
  });

  test('with props', async ({ bench }) => {
    await bench('with props', () => {
      renderToString(list({ size: 32, color: 'red', className: 'icon', strokeWidth: 1.5 }));
    }).run();
  });
});

describe(`client mount of ${COUNT} icons`, () => {
  test('default props', async ({ bench }) => {
    await bench('default props', () => {
      mount(list());
    }).run();
  });

  test('inside LucideProvider', async ({ bench }) => {
    await bench('inside LucideProvider', () => {
      mount(withProvider(list()));
    }).run();
  });

  test('nonScalingStroke', async ({ bench }) => {
    await bench('nonScalingStroke', () => {
      mount(list({ nonScalingStroke: true }));
    }).run();
  });
});

describe(`client re-render of ${COUNT} icons`, () => {
  const rerenderDefault = rerenderer(() => list());
  const rerenderProps = rerenderer(() => list({ size: 32, color: 'red', className: 'icon' }));
  const rerenderProvider = rerenderer(() => withProvider(list()));

  test('default props', async ({ bench }) => {
    await bench('default props', () => {
      rerenderDefault();
    }).run();
  });

  test('with props', async ({ bench }) => {
    await bench('with props', () => {
      rerenderProps();
    }).run();
  });

  test('inside LucideProvider', async ({ bench }) => {
    await bench('inside LucideProvider', () => {
      rerenderProvider();
    }).run();
  });
});
