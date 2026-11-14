import { createContext, createElement, type ReactNode, useContext, useMemo } from 'react';

const LucideContext = createContext<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  nonScalingStroke?: boolean;
  className?: string;
}>({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  nonScalingStroke: false,
  className: '',
});

interface LucideProviderProps {
  children: ReactNode;
  size?: number;
  color?: string;
  strokeWidth?: number;
  nonScalingStroke?: boolean;
  className?: string;
}

export function LucideProvider({
  children,
  size,
  color,
  strokeWidth,
  nonScalingStroke,
  className,
}: LucideProviderProps) {
  const value = useMemo(
    () => ({
      size,
      color,
      strokeWidth,
      nonScalingStroke,
      className,
    }),
    [size, color, strokeWidth, nonScalingStroke, className],
  );

  return createElement(LucideContext.Provider, { value }, children);
}

export const useLucideContext = () => useContext(LucideContext);
