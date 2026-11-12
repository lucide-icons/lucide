import { createContext, useContext, type Child } from 'hono/jsx';

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
  children: Child;
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
  const value = {
    size,
    color,
    strokeWidth,
    absoluteStrokeWidth,
    nonScalingStroke,
    class: className,
  };

  return <LucideContext.Provider value={value}>{children}</LucideContext.Provider>;
}

export const useLucideContext = () => useContext(LucideContext);
