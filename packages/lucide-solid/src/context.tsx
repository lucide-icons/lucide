import { createContext, omit, type Element } from 'solid-js';

export const LucideContext = createContext<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}>({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  class: '',
});

interface LucideProviderProps {
  children: Element;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

export function LucideProvider(props: LucideProviderProps) {
  return <LucideContext value={omit(props, 'children')}>{props.children}</LucideContext>;
}
