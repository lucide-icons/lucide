import { inject, ref, watch, type Ref } from 'vue';

export const ICON_STYLE_CONTEXT = Symbol('style');

interface IconSizeContext {
  size: Ref<number>;
  strokeWidth: Ref<number>;
  color: Ref<string>;
  absoluteStrokeWidth: Ref<boolean>;
}

export const STYLE_DEFAULTS = {
  size: 24,
  strokeWidth: 2,
  color: 'currentColor',
  absoluteStrokeWidth: false,
};

const STORAGE_KEYS = {
  size: 'lucide-icon-size',
  strokeWidth: 'lucide-icon-stroke-width',
  color: 'lucide-icon-color',
  absoluteStrokeWidth: 'lucide-icon-absolute-stroke-width',
} as const;

const persistedIconStyle: IconSizeContext = {
  size: ref(STYLE_DEFAULTS.size),
  strokeWidth: ref(STYLE_DEFAULTS.strokeWidth),
  color: ref(STYLE_DEFAULTS.color),
  absoluteStrokeWidth: ref(STYLE_DEFAULTS.absoluteStrokeWidth),
};

let initialized = false;

function readNumber(key: string, fallback: number, min: number, max: number) {
  const storedValue = localStorage.getItem(key);
  const value = Number(storedValue);

  return storedValue !== null && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

function readColor() {
  const value = localStorage.getItem(STORAGE_KEYS.color);

  return value && CSS.supports('color', value) ? value : STYLE_DEFAULTS.color;
}

function persistIconStyle() {
  try {
    localStorage.setItem(STORAGE_KEYS.size, String(persistedIconStyle.size.value));
    localStorage.setItem(STORAGE_KEYS.strokeWidth, String(persistedIconStyle.strokeWidth.value));
    localStorage.setItem(STORAGE_KEYS.color, persistedIconStyle.color.value);
    localStorage.setItem(
      STORAGE_KEYS.absoluteStrokeWidth,
      String(persistedIconStyle.absoluteStrokeWidth.value),
    );
  } catch {
    // Storage may be unavailable, for example in private browsing mode.
  }
}

export function initializePersistedIconStyle() {
  if (initialized || typeof window === 'undefined') return;

  initialized = true;

  try {
    persistedIconStyle.size.value = readNumber(STORAGE_KEYS.size, STYLE_DEFAULTS.size, 16, 256);
    persistedIconStyle.strokeWidth.value = readNumber(
      STORAGE_KEYS.strokeWidth,
      STYLE_DEFAULTS.strokeWidth,
      0.5,
      3,
    );
    persistedIconStyle.color.value = readColor();
    persistedIconStyle.absoluteStrokeWidth.value =
      localStorage.getItem(STORAGE_KEYS.absoluteStrokeWidth) === 'true';

    watch(
      [
        persistedIconStyle.size,
        persistedIconStyle.strokeWidth,
        persistedIconStyle.color,
        persistedIconStyle.absoluteStrokeWidth,
      ],
      persistIconStyle,
    );
  } catch {
    // Keep the defaults when storage cannot be read.
  }
}

export function usePersistedIconStyle() {
  return persistedIconStyle;
}

export const iconStyleContext = persistedIconStyle;

if (typeof document !== 'undefined') {
  watch(
    persistedIconStyle.absoluteStrokeWidth,
    (enabled) => document.documentElement.classList.toggle('absolute-stroke-width', enabled),
    { immediate: true },
  );
}

export function useIconStyleContext(): IconSizeContext {
  const context = inject<IconSizeContext>(ICON_STYLE_CONTEXT);

  if (!context) {
    throw new Error('useIconStyleContext must be used with useIconStyleProvider');
  }

  return context;
}
