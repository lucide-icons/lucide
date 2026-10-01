import { inject, Ref, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

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
