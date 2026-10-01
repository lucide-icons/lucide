import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { iconStyleHeadScript } from './iconStyleHead.ts';

function initialize(values: Record<string, string>, blocked = false) {
  const properties = new Map<string, string>();
  const classes = new Set<string>();
  runInNewContext(iconStyleHeadScript, {
    document: {
      documentElement: {
        style: { setProperty: (key: string, value: string) => properties.set(key, value) },
        classList: {
          add: (value: string) => classes.add(value),
          toggle: (value: string, enabled: boolean) =>
            enabled ? classes.add(value) : classes.delete(value),
        },
      },
    },
    localStorage: {
      getItem(key: string) {
        if (blocked) throw new Error('Storage unavailable');
        return values[key] ?? null;
      },
    },
    CSS: { supports: () => true },
  });
  return { properties, classes };
}

test('saved settings are applied before any Vue component exists', () => {
  const { properties, classes } = initialize({
    'lucide-icon-size': '240',
    'lucide-icon-stroke-width': '1.5',
    'lucide-icon-color': '#ff0000',
    'lucide-icon-absolute-stroke-width': 'true',
  });
  assert.equal(properties.get('--customize-size'), '240');
  assert.equal(properties.get('--home-customize-size'), '48');
  assert.equal(properties.get('--customize-strokeWidth'), '1.5');
  assert.equal(properties.get('--customize-color'), '#ff0000');
  assert.ok(classes.has('absolute-stroke-width'));
  assert.ok(classes.has('icon-style-pending'));
});

test('false is restored as false rather than treated as a truthy string', () => {
  assert.equal(
    initialize({ 'lucide-icon-absolute-stroke-width': 'false' }).classes.has(
      'absolute-stroke-width',
    ),
    false,
  );
});

test('first visit and unavailable storage leave the default page visible', () => {
  assert.equal(initialize({}).classes.size, 0);
  assert.equal(initialize({}, true).classes.size, 0);
});

test('invalid numeric preferences do not produce invalid CSS', () => {
  assert.equal(initialize({ 'lucide-icon-size': 'NaN' }).properties.has('--customize-size'), false);
});
