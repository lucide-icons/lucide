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
  const value = omit(props, 'children');

  return <LucideContext value={value}>{props.children}</LucideContext>;
}
