import { createContext, type ReactNode, useContext } from 'react';

const LucideContext = createContext<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}>({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
});

interface LucideProviderProps {
  children: ReactNode;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

export function LucideProvider({ children, ...props }: LucideProviderProps) {
  return <LucideContext.Provider value={props}>{children}</LucideContext.Provider>;
}

export const useLucideContext = () => useContext(LucideContext);
