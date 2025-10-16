import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { LucideProps } from './types';

type LucideConfig = {
  size: number;
  fill: string;
  color: string;
  strokeWidth: number;
  absoluteStrokeWidth: boolean;
};

const LucideContext = createContext<LucideProps>({});

type LucideProviderProps = {
  children: ReactNode;
} & Partial<LucideConfig>;

export function LucideProvider({
  children,
  size,
  fill,
  color,
  strokeWidth,
  absoluteStrokeWidth,
}: LucideProviderProps) {
  const value = useMemo(
    () => ({
      size,
      fill,
      color,
      strokeWidth,
      absoluteStrokeWidth,
    }),
    [size, fill, color, strokeWidth, absoluteStrokeWidth],
  );

  return <LucideContext.Provider value={value}>{children}</LucideContext.Provider>;
}

export const useLucideContext = () => useContext(LucideContext);
