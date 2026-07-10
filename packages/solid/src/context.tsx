import { createContext, omit } from 'solid-js';
import { type JSX } from '@solidjs/web';

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
  children: JSX.Element;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

export function LucideProvider(props: LucideProviderProps) {
  const [value, rest] = omit(props, [
    'size',
    'color',
    'strokeWidth',
    'absoluteStrokeWidth',
    'class',
  ]);

  return <LucideContext.Provider value={value}>{rest.children}</LucideContext.Provider>;
}
