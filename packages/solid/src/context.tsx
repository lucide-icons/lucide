import { createContext, omit, type Element } from 'solid-js';

export const LucideContext = createContext<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  nonScalingStroke?: boolean;
  class?: string;
}>({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  nonScalingStroke: false,
  class: '',
});

interface LucideProviderProps {
  children: Element;
  size?: number;
  color?: string;
  strokeWidth?: number;
  nonScalingStroke?: boolean;
  class?: string;
}

export function LucideProvider(props: LucideProviderProps) {
  return <LucideContext value={omit(props, 'children')}>{props.children}</LucideContext>;
}
