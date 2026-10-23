'use client';

import { createContext, createElement, type ReactNode, useContext, useMemo } from 'react';
import { LucideProps } from './types';

type LucideConfig = {
  size: number | string;
  color: string;
  strokeWidth: number | string;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth: boolean;
  nonScalingStroke: boolean;
  className: string;
};

const LucideContext = createContext<LucideProps>({});

type LucideProviderProps = {
  children: ReactNode;
} & Partial<LucideConfig>;

export function LucideProvider({
  children,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  nonScalingStroke,
  className,
}: LucideProviderProps) {
  const value = useMemo(
    () => ({
      size,
      color,
      strokeWidth,
      absoluteStrokeWidth,
      nonScalingStroke,
      className,
    }),
    [size, color, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className],
  );

  return createElement(LucideContext.Provider, { value }, children);
}

export const useLucideContext = () => useContext(LucideContext);
