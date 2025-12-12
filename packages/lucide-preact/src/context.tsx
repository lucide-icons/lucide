import { createContext, type ComponentChildren } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

const LucideContext = createContext<{
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
  children: ComponentChildren;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

export function LucideProvider({
  children,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  class: className
}: LucideProviderProps) {
  const value = useMemo(
    () => ({
      size,
      color,
      strokeWidth,
      absoluteStrokeWidth,
      class: className,
    }),
    [size, color, strokeWidth, absoluteStrokeWidth, className],
  );

  return <LucideContext.Provider value={value}>{children}</LucideContext.Provider>;
}

export const useLucideContext = () => useContext(LucideContext);
