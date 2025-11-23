import { createContext, splitProps, type JSXElement } from 'solid-js';

export const LucideContext = createContext<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}>({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
});

interface LucideProviderProps {
  children: JSXElement;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

export function LucideProvider(props: LucideProviderProps) {
  const [value, rest] = splitProps(props, ['size', 'color', 'strokeWidth', 'absoluteStrokeWidth']);

  return <LucideContext.Provider value={value}>{rest.children}</LucideContext.Provider>;
}
