import assert from 'node:assert/strict';
import { test } from 'node:test';
import { nextTick } from 'vue';

const storedValues = new Map<string, string>([
  ['lucide-icon-size', '240'],
  ['lucide-icon-stroke-width', '1.5'],
  ['lucide-icon-color', '#ff0000'],
  ['lucide-icon-absolute-stroke-width', 'true'],
]);
const styleProperties = new Map<string, string>();
const classes = new Set<string>();

class StorageMock {
  getItem(key: string) {
    return storedValues.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    storedValues.set(key, value);
  }

  removeItem(key: string) {
    storedValues.delete(key);
  }
}

class StorageEventMock {
  type: string;
  options: unknown;

  constructor(type: string, options: unknown) {
    this.type = type;
    this.options = options;
  }
}

const localStorage = new StorageMock();
const document = {
  documentElement: {
    style: { setProperty: (key: string, value: string) => styleProperties.set(key, value) },
    classList: {
      toggle: (value: string, enabled: boolean) =>
        enabled ? classes.add(value) : classes.delete(value),
    },
  },
};
const window = {
  document,
  localStorage,
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {},
};

Object.assign(globalThis, {
  window,
  document,
  localStorage,
  Storage: StorageMock,
  StorageEvent: StorageEventMock,
  CSS: { supports: () => true },
});

const { useIconStyle, usePersistedIconStyle } = await import('./useIconStyle.ts');

test('creates a non-persisted icon style from the defaults', () => {
  const style = useIconStyle();

  assert.equal(style.size.value, 24);
  assert.equal(style.strokeWidth.value, 2);
  assert.equal(style.color.value, 'currentColor');
  assert.equal(style.absoluteStrokeWidth.value, false);

  style.size.value = 48;

  assert.equal(storedValues.get('lucide-icon-size'), '240');
  assert.equal(styleProperties.get('--customize-size'), '240');
});

test('restores persisted settings and applies the shared CSS variables', () => {
  const style = usePersistedIconStyle();

  assert.equal(style.size.value, 240);
  assert.equal(style.strokeWidth.value, 1.5);
  assert.equal(style.color.value, '#ff0000');
  assert.equal(style.absoluteStrokeWidth.value, true);
  assert.equal(style.isCustomized.value, true);
  assert.equal(styleProperties.get('--customize-size'), '240');
  assert.equal(styleProperties.get('--customize-strokeWidth'), '1.5');
  assert.equal(styleProperties.get('--customize-color'), '#ff0000');
  assert.ok(classes.has('absolute-stroke-width'));
});

test('resetting updates refs, CSS variables, and persisted values', async () => {
  const style = usePersistedIconStyle();
  style.resetStyle();
  await nextTick();

  assert.equal(style.size.value, 24);
  assert.equal(style.strokeWidth.value, 2);
  assert.equal(style.color.value, 'currentColor');
  assert.equal(style.absoluteStrokeWidth.value, false);
  assert.equal(style.isCustomized.value, false);
  assert.equal(styleProperties.get('--customize-size'), '24');
  assert.equal(styleProperties.get('--customize-strokeWidth'), '2');
  assert.equal(styleProperties.get('--customize-color'), 'currentColor');
  assert.equal(classes.has('absolute-stroke-width'), false);
  assert.equal(storedValues.get('lucide-icon-size'), '24');
  assert.equal(storedValues.get('lucide-icon-stroke-width'), '2');
  assert.equal(storedValues.get('lucide-icon-color'), 'currentColor');
  assert.equal(storedValues.get('lucide-icon-absolute-stroke-width'), 'false');
});
