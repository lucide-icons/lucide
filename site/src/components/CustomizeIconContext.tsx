import { createContext, useState, useContext, useMemo } from 'react';

interface ICustomIconStyle {
  color: string;
  setColor: (s: string) => void;
  strokeWidth: number;
  setStroke: (n: number) => void;
  size: number;
  setSize: (n: number) => void;
  resetStyle: () => void;
}

const DEFAULT_STYLE = {
  color: 'currentColor',
  strokeWidth: 2,
  size: 24,
};

export const IconStyleContext = createContext<ICustomIconStyle>({
  color: 'currentColor',
  setColor: () => null,
  strokeWidth: 2,
  setStroke: () => null,
  size: 24,
  setSize: () => null,
  category: null,
  setCategory: () => null,
  resetStyle: () => null,
});

export function CustomizeIconContext({ children }): JSX.Element {
  const [color, setColor] = useState(DEFAULT_STYLE.color);
  const [stroke, setStroke] = useState(DEFAULT_STYLE.strokeWidth);
  const [size, setSize] = useState(DEFAULT_STYLE.size);
  const [category, setCategory] = useState(null);

  function resetStyle() {
    setColor(DEFAULT_STYLE.color);
    setStroke(DEFAULT_STYLE.strokeWidth);
    setSize(DEFAULT_STYLE.size);
    setCategory(null);
  }

  const value = useMemo(
    () => ({
      color,
      setColor,
      strokeWidth: stroke,
      setStroke,
      size,
      setSize,
      category,
      setCategory,
      resetStyle,
    }),
    [color, setColor, stroke, setStroke, size, setSize, category, setCategory, resetStyle],
  );

  return <IconStyleContext.Provider value={value}>{children}</IconStyleContext.Provider>;
}

export function useCustomizeIconContext(): ICustomIconStyle {
  const context = useContext(IconStyleContext);
  if (context === undefined) {
    throw new Error('useCustomizeIconContext must be used within a IconStyleContextProvider');
  }
  return context;
}
