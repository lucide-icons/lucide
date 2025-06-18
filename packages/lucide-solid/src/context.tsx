import {
  createContext,
  useContext,
  type JSXElement
} from "solid-js";

export const LucideContext = createContext<{
  size?: number;
  fill?: string;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}>({
  size: 24,
  fill: 'none',
  color: 'currentColor',
  strokeWidth: 2,
});

interface LucideProviderProps {
  children: JSXElement;
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
