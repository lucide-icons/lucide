import { getContext, setContext } from 'svelte';

const LucideContext = Symbol('lucide-context');

export interface LucideGlobalContext {
  color?: string;
  size?: number;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

export const setLucideProps = (globalProps: LucideGlobalContext) =>
  setContext(LucideContext, globalProps);

export let getLucideContext = () => getContext<LucideGlobalContext>(LucideContext);
