import { createContext, splitProps, type JSXElement } from 'solid-js';

export const LucideContext = createContext<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
  class?: string;
}>({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  nonScalingStroke: false,
  class: '',
});

interface LucideProviderProps {
  children: JSXElement;
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

export function LucideProvider(props: LucideProviderProps) {
  const [value, rest] = splitProps(props, [
    'size',
    'color',
    'strokeWidth',
    'absoluteStrokeWidth',
    'nonScalingStroke',
    'class',
  ]);

  return <LucideContext.Provider value={value}>{rest.children}</LucideContext.Provider>;
}
