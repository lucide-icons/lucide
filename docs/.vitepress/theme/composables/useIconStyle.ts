/* eslint-disable no-console */

import { ref, inject, Ref } from 'vue';
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

export const iconStyleContext = {
  size: useLocalStorage('lucide-custom-size', STYLE_DEFAULTS.size),
  strokeWidth: useLocalStorage('lucide-custom-strokeWidth', STYLE_DEFAULTS.strokeWidth),
  color: useLocalStorage('lucide-custom-color', STYLE_DEFAULTS.color),
  absoluteStrokeWidth: useLocalStorage(
    'lucide-custom-absoluteStroke',
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
