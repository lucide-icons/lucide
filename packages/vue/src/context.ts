import { provide, inject } from 'vue';

export const LUCIDE_CONTEXT = Symbol('lucide-icons');

interface LucideIconsContext {
  size?: number;
  color?: string;
  strokeWidth?: number;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
  class?: string;
}

export function setLucideProps(props: LucideIconsContext) {
  return provide(LUCIDE_CONTEXT, props);
}

export function useLucideProps() {
  return inject<LucideIconsContext>(LUCIDE_CONTEXT, {});
}
