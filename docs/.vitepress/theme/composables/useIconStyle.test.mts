import assert from 'node:assert/strict';
import { test } from 'node:test';
import { nextTick } from 'vue';

const storedValues = new Map<string, string>([
  ['lucide-icon-size', '48'],
  ['lucide-icon-stroke-width', '1.5'],
  ['lucide-icon-color', '#ff0000'],
  ['lucide-icon-absolute-stroke-width', 'true'],
]);

Object.assign(globalThis, {
  window: {},
  localStorage: {
    getItem: (key: string) => storedValues.get(key) ?? null,
    setItem: (key: string, value: string) => storedValues.set(key, value),
  },
  CSS: { supports: () => true },
});

const { initializePersistedIconStyle, usePersistedIconStyle } = await import('./useIconStyle.ts');

test('defaults remain visible until persisted icon settings are initialized', () => {
  const style = usePersistedIconStyle();

  assert.equal(style.size.value, 24);
  assert.equal(style.strokeWidth.value, 2);
  assert.equal(style.color.value, 'currentColor');
  assert.equal(style.absoluteStrokeWidth.value, false);
});

test('initialization restores saved settings', () => {
  initializePersistedIconStyle();

  const style = usePersistedIconStyle();
  assert.equal(style.size.value, 48);
  assert.equal(style.strokeWidth.value, 1.5);
  assert.equal(style.color.value, '#ff0000');
  assert.equal(style.absoluteStrokeWidth.value, true);
});

test('changes are persisted after initialization', async () => {
  const style = usePersistedIconStyle();
  style.size.value = 32;
  await nextTick();

  assert.equal(storedValues.get('lucide-icon-size'), '32');
});
