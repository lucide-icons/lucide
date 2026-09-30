import { inject, Ref } from 'vue';
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
  size: useLocalStorage('lucide-icon-size', STYLE_DEFAULTS.size),
  strokeWidth: useLocalStorage('lucide-icon-stroke-width', STYLE_DEFAULTS.strokeWidth),
  color: useLocalStorage('lucide-icon-color', STYLE_DEFAULTS.color),
  absoluteStrokeWidth: useLocalStorage(
    'lucide-icon-absolute-stroke-width',
    STYLE_DEFAULTS.absoluteStrokeWidth,
  ),
};

export function usePersistedIconStyle() {
  return persistedIconStyle;
}

export const iconStyleContext = persistedIconStyle;

export function useIconStyleContext(): IconSizeContext {
  const context = inject<IconSizeContext>(ICON_STYLE_CONTEXT);

  if (!context) {
    throw new Error('useIconStyleContext must be used with useIconStyleProvider');
  }

  return context;
}
