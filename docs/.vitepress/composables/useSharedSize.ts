/* eslint-disable no-console */

import {
  ref, provide, inject, Ref
} from 'vue';

export const SIZE_CONTEXT_NAME = Symbol('size');

interface IconSizeContext {
  size: Ref<number>
}

export const context = {
  size: ref(24),
};

export function useIconSizeProvider(): IconSizeContext  {
  provide(SIZE_CONTEXT_NAME, context);

  return context;
}

export function useIconSizeContext(): IconSizeContext{
  const context = inject<IconSizeContext>(SIZE_CONTEXT_NAME);

  if (!context) {
    throw new Error('useIconSizeContext must be used with useIconSizeProvider');
  }

  return context;
}
