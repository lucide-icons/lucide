import { computed, inject, ref, watch, type ComputedRef, type Ref } from 'vue';
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

type IconStyle = Pick<IconStyleContext, 'size' | 'strokeWidth' | 'color' | 'absoluteStrokeWidth'>;

export const STYLE_DEFAULTS = {
  size: 24,
  strokeWidth: 2,
  color: 'currentColor',
  absoluteStrokeWidth: false,
};

const persistedIconStyle = {
  size: useLocalStorage('icon-size', STYLE_DEFAULTS.size, { initOnMounted: false }),
  strokeWidth: useLocalStorage('icon-stroke-width', STYLE_DEFAULTS.strokeWidth, {
    initOnMounted: false,
  }),
  color: useLocalStorage('icon-color', STYLE_DEFAULTS.color, { initOnMounted: false }),
  absoluteStrokeWidth: useLocalStorage(
    'icon-absolute-stroke-width',
    STYLE_DEFAULTS.absoluteStrokeWidth,
    { initOnMounted: false },
  ),
};

function createIconStyleContext(style: IconStyle): IconStyleContext {
  const isCustomized = computed(() => {
    return (
      style.color.value !== STYLE_DEFAULTS.color ||
      style.strokeWidth.value !== STYLE_DEFAULTS.strokeWidth ||
      style.size.value !== STYLE_DEFAULTS.size ||
      style.absoluteStrokeWidth.value !== STYLE_DEFAULTS.absoluteStrokeWidth
    );
  });

  function resetStyle() {
    style.color.value = STYLE_DEFAULTS.color;
    style.strokeWidth.value = STYLE_DEFAULTS.strokeWidth;
    style.size.value = STYLE_DEFAULTS.size;
    style.absoluteStrokeWidth.value = STYLE_DEFAULTS.absoluteStrokeWidth;
  }

  return {
    ...style,
    isCustomized,
    resetStyle,
  };
}

export const iconStyleContext = createIconStyleContext(persistedIconStyle);

export function useIconStyle() {
  return createIconStyleContext({
    size: ref(STYLE_DEFAULTS.size),
    strokeWidth: ref(STYLE_DEFAULTS.strokeWidth),
    color: ref(STYLE_DEFAULTS.color),
    absoluteStrokeWidth: ref(STYLE_DEFAULTS.absoluteStrokeWidth),
  });
}

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
