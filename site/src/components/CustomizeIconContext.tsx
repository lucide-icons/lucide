import { createContext, useRef, useState, MutableRefObject, useContext, useMemo } from 'react';

type IconsRef = Record<string, SVGSVGElement>;

interface ICustomIconStyle {
  color: string;
  setColor: (s: string) => void;
  strokeWidth: number;
  setStroke: (n: number) => void;
  size: number;
  setSize: (n: number) => void;
  resetStyle: () => void;
  iconsRef: MutableRefObject<IconsRef>;
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
  resetStyle: () => null,
  iconsRef: { current: {} },
});

export function CustomizeIconContext({ children }): JSX.Element {
  const iconsRef = useRef<IconsRef>({});
  const [color, setColor] = useState(DEFAULT_STYLE.color);
  const [stroke, setStroke] = useState(DEFAULT_STYLE.strokeWidth);
  const [size, setSize] = useState(DEFAULT_STYLE.size);

  function resetStyle() {
    setColor(DEFAULT_STYLE.color);
    setStroke(DEFAULT_STYLE.strokeWidth);
    setSize(DEFAULT_STYLE.size);
  }

  const value = useMemo(
    () => ({
      color,
      setColor,
      strokeWidth: stroke,
      setStroke,
      size,
      setSize,
      resetStyle,
      iconsRef,
    }),
    [color, setColor, stroke, setStroke, size, setSize, resetStyle, iconsRef],
  );

  return <IconStyleContext.Provider value={value}>{children}</IconStyleContext.Provider>;
}

export function useCustomizeIconContext() {
  const context = useContext(IconStyleContext);
  if (context === undefined) {
    return {
      color: 'currentColor',
      size: 24,
      strokeWidth: 2,
      iconsRef: { current: {} },
      /* eslint-disable @typescript-eslint/no-empty-function */
      setStroke: function() {},
      setColor: function() {},
      setSize: function() {},
      resetStyle: function() {},
      /* eslint-enable @typescript-eslint/no-empty-function */
    };
  }
  return context;
}
