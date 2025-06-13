import {
  createContext,
  type ReactNode,
  useContext,
} from "react";

const LucideContext = createContext<{
  size?: number;
  fill?: string;
  color?: string;
  strokeWidth?: number;
}>({
  size: 24,
  fill: 'none',
  color: 'currentColor',
  strokeWidth: 2,
});

interface LucideProviderProps {
  children: ReactNode;
  size?: number
  fill?: string;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

export function LucideProvider({ children, ...props }: LucideProviderProps) {
  return (
    <LucideContext.Provider value={props}>
      {children}
    </LucideContext.Provider>
  );
}

export function useLucideContext() {

  return useContext(LucideContext);;
}
