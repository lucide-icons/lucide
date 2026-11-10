import { createContext, h, type ComponentChildren } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

const LucideContext = createContext<{
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
  children: ComponentChildren;
  size?: number;
  color?: string;
  strokeWidth?: number;
  nonScalingStroke?: boolean;
  class?: string;
}

export function LucideProvider({
  children,
  size,
  color,
  strokeWidth,
  nonScalingStroke,
  class: className,
}: LucideProviderProps) {
  const value = useMemo(
    () => ({
      size,
      color,
      strokeWidth,
      nonScalingStroke,
      class: className,
    }),
    [size, color, strokeWidth, nonScalingStroke, className],
  );

  return h(LucideContext.Provider, { value }, children);
}

export const useLucideContext = () => useContext(LucideContext);
