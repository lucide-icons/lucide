import { computed, inject, ref, watch, type ComputedRef, type Ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

export const ICON_STYLE_CONTEXT = Symbol('style');

interface IconStyleContext {
  size: Ref<number>;
  strokeWidth: Ref<number>;
  color: Ref<string>;
  nonScalingStroke: Ref<boolean>;
  isCustomized: ComputedRef<boolean>;
  resetStyle: () => void;
}

type IconStyle = Pick<IconStyleContext, 'size' | 'strokeWidth' | 'color' | 'nonScalingStroke'>;

export const STYLE_DEFAULTS = {
  size: 24,
  strokeWidth: 2,
  color: 'currentColor',
  nonScalingStroke: false,
};

const persistedIconStyle = {
  size: useLocalStorage('icon-size', STYLE_DEFAULTS.size, { initOnMounted: false }),
  strokeWidth: useLocalStorage('icon-stroke-width', STYLE_DEFAULTS.strokeWidth, {
    initOnMounted: false,
  }),
  color: useLocalStorage('icon-color', STYLE_DEFAULTS.color, { initOnMounted: false }),
  nonScalingStroke: useLocalStorage('icon-non-scaling-stroke', STYLE_DEFAULTS.nonScalingStroke, {
    initOnMounted: false,
  }),
};

function createIconStyleContext(style: IconStyle): IconStyleContext {
  const isCustomized = computed(() => {
    return (
      style.color.value !== STYLE_DEFAULTS.color ||
      style.strokeWidth.value !== STYLE_DEFAULTS.strokeWidth ||
      style.size.value !== STYLE_DEFAULTS.size ||
      style.nonScalingStroke.value !== STYLE_DEFAULTS.nonScalingStroke
    );
  });

  function resetStyle() {
    style.color.value = STYLE_DEFAULTS.color;
    style.strokeWidth.value = STYLE_DEFAULTS.strokeWidth;
    style.size.value = STYLE_DEFAULTS.size;
    style.nonScalingStroke.value = STYLE_DEFAULTS.nonScalingStroke;
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
    nonScalingStroke: ref(STYLE_DEFAULTS.nonScalingStroke),
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
      persistedIconStyle.nonScalingStroke,
    ],
    ([size, strokeWidth, color, nonScalingStroke]) => {
      const root = document.documentElement;
      root.style.setProperty('--customize-size', String(Math.min(256, Math.max(16, size))));
      root.style.setProperty(
        '--customize-strokeWidth',
        String(Math.min(3, Math.max(0.5, strokeWidth))),
      );
      if (CSS.supports('color', color)) root.style.setProperty('--customize-color', color);
      root.classList.toggle('non-scaling-stroke', nonScalingStroke);
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
