import { provide, inject } from 'vue';

export const LUCIDE_CONTEXT = Symbol('lucide-icons');

interface LucideIconsContext {
  size?: number;
  fill?: string;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

export function setLucideProps(props: LucideIconsContext) {
  return provide(LUCIDE_CONTEXT, props);
}

export function useLucideProps() {
  return inject<LucideIconsContext>(LUCIDE_CONTEXT, {});
}
