import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { LucideProps } from './types';

type LucideConfig = {
  size: number;
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
  color,
  strokeWidth,
  absoluteStrokeWidth,
}: LucideProviderProps) {
  const value = useMemo(
    () => ({
      size,
      color,
      strokeWidth,
      absoluteStrokeWidth,
    }),
    [size, color, strokeWidth, absoluteStrokeWidth],
  );

  return <LucideContext.Provider value={value}>{children}</LucideContext.Provider>;
}

export const useLucideContext = () => useContext(LucideContext);
