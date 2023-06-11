/* eslint-disable no-console */

import {
  ref, inject, Ref
} from 'vue';

export const ICON_STYLE_CONTEXT = Symbol('size');

interface IconSizeContext {
  size: Ref<number>
  strokeWidth: Ref<number>
  color: Ref<string>
}

export const iconStyleContext = {
  size: ref(24),
  strokeWidth: ref(2),
  color: ref('currentColor'),
  absoluteStrokeWidth: ref(false),
};

export function useIconStyleContext(): IconSizeContext{
  const context = inject<IconSizeContext>(ICON_STYLE_CONTEXT);

  if (!context) {
    throw new Error('useIconStyleContext must be used with useIconStyleProvider');
  }

  return context;
}
