import { getContext, setContext } from 'svelte';

const LucideContext = Symbol('lucide-context');

export interface LucideGlobalContext {
  color?: string;
  size?: number;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

export const setLucideProps = (globalProps: LucideGlobalContext) =>
  setContext(LucideContext, globalProps);

export const getLucideContext = () => getContext<LucideGlobalContext>(LucideContext);
