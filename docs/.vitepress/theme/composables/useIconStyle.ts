import { inject, Ref } from 'vue';
import { useStorage } from '@vueuse/core';

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

// Persisted via localStorage (SSR-safe: @vueuse/core's useStorage falls back
// to the provided default when `window`/`localStorage` isn't available, e.g.
// during VitePress's static build) so customizer settings survive reloads
// and repeat visits instead of resetting to STYLE_DEFAULTS every time.
export const iconStyleContext = {
  size: useStorage('lucide-icon-style-size', STYLE_DEFAULTS.size),
  strokeWidth: useStorage('lucide-icon-style-strokeWidth', STYLE_DEFAULTS.strokeWidth),
  color: useStorage('lucide-icon-style-color', STYLE_DEFAULTS.color),
  absoluteStrokeWidth: useStorage(
    'lucide-icon-style-absoluteStrokeWidth',
    STYLE_DEFAULTS.absoluteStrokeWidth,
  ),
};

export function useIconStyleContext(): IconSizeContext {
  const context = inject<IconSizeContext>(ICON_STYLE_CONTEXT);

  if (!context) {
    throw new Error('useIconStyleContext must be used with useIconStyleProvider');
  }

  return context;
}
