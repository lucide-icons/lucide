import { createContext, h, type ComponentChildren } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

const LucideContext = createContext<{
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
  children: ComponentChildren;
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

export function LucideProvider({
  children,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  nonScalingStroke,
  class: className,
}: LucideProviderProps) {
  const value = useMemo(
    () => ({
      size,
      color,
      strokeWidth,
      absoluteStrokeWidth,
      nonScalingStroke,
      class: className,
    }),
    [size, color, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className],
  );

  return h(LucideContext.Provider, { value }, children);
}

export const useLucideContext = () => useContext(LucideContext);
