import { computed, inject, watch, type ComputedRef, type Ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

export const ICON_STYLE_CONTEXT = Symbol('style');

interface IconStyleContext {
  size: Ref<number>;
  strokeWidth: Ref<number>;
  color: Ref<string>;
  absoluteStrokeWidth: Ref<boolean>;
  isCustomized: ComputedRef<boolean>;
  resetStyle: () => void;
}

export const STYLE_DEFAULTS = {
  size: 24,
  strokeWidth: 2,
  color: 'currentColor',
  absoluteStrokeWidth: false,
};

const persistedIconStyle = {
  size: useLocalStorage('lucide-icon-size', STYLE_DEFAULTS.size, { initOnMounted: false }),
  strokeWidth: useLocalStorage('lucide-icon-stroke-width', STYLE_DEFAULTS.strokeWidth, {
    initOnMounted: false,
  }),
  color: useLocalStorage('lucide-icon-color', STYLE_DEFAULTS.color, { initOnMounted: false }),
  absoluteStrokeWidth: useLocalStorage(
    'lucide-icon-absolute-stroke-width',
    STYLE_DEFAULTS.absoluteStrokeWidth,
    { initOnMounted: false },
  ),
};

const isCustomized = computed(() => {
  return (
    persistedIconStyle.color.value !== STYLE_DEFAULTS.color ||
    persistedIconStyle.strokeWidth.value !== STYLE_DEFAULTS.strokeWidth ||
    persistedIconStyle.size.value !== STYLE_DEFAULTS.size ||
    persistedIconStyle.absoluteStrokeWidth.value !== STYLE_DEFAULTS.absoluteStrokeWidth
  );
});

function resetStyle() {
  persistedIconStyle.color.value = STYLE_DEFAULTS.color;
  persistedIconStyle.strokeWidth.value = STYLE_DEFAULTS.strokeWidth;
  persistedIconStyle.size.value = STYLE_DEFAULTS.size;
  persistedIconStyle.absoluteStrokeWidth.value = STYLE_DEFAULTS.absoluteStrokeWidth;
}

export const iconStyleContext: IconStyleContext = {
  ...persistedIconStyle,
  isCustomized,
  resetStyle,
};

export function usePersistedIconStyle() {
  return iconStyleContext;
}

if (typeof document !== 'undefined') {
  watch(
    [
      persistedIconStyle.size,
      persistedIconStyle.strokeWidth,
      persistedIconStyle.color,
      persistedIconStyle.absoluteStrokeWidth,
    ],
    ([size, strokeWidth, color, absoluteStrokeWidth]) => {
      const root = document.documentElement;
      root.style.setProperty('--customize-size', String(Math.min(256, Math.max(16, size))));
      root.style.setProperty(
        '--customize-strokeWidth',
        String(Math.min(3, Math.max(0.5, strokeWidth))),
      );
      if (CSS.supports('color', color)) root.style.setProperty('--customize-color', color);
      root.classList.toggle('absolute-stroke-width', absoluteStrokeWidth);
    },
    { immediate: true, flush: 'sync' },
  );
}

export function useIconStyleContext(): IconStyleContext {
  const context = inject<IconStyleContext>(ICON_STYLE_CONTEXT);

  if (!context) {
    throw new Error('useIconStyleContext must be used with useIconStyleProvider');
  }

  return context;
}
