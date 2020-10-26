import { createContext, useEffect, useState } from 'react';
import { useColorMode } from '@chakra-ui/core';
import theme from '../lib/theme';

interface ICustomIconStyle {
  color: string;
  setColor: (s: string) => void;
  strokeWidth: number;
  setStroke: (n: number) => void;
  size: number;
  setSize: (n: number) => void;
}

export const IconStyleContext = createContext<ICustomIconStyle>({
  color: '',
  setColor: (s: string) => null,
  strokeWidth: 2,
  setStroke: (n: number) => null,
  size: 24,
  setSize: (n: number) => null,
});

export function CustomizeIconContext({ children }) {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState('');
  const [stroke, setStroke] = useState(2);
  const [size, setSize] = useState(24);

  useEffect(() => {
    setColor(colorMode === 'light' ? theme.colors.gray[800] : theme.colors.white);
  }, [colorMode]);

  return (
    <IconStyleContext.Provider
      value={{ color, setColor, strokeWidth: stroke, setStroke, size, setSize }}
    >
      {children}
    </IconStyleContext.Provider>
  );
}
