import {createContext, useContext, useMemo, useState} from 'react';
import {IconEntity} from "../types";
import { useDisclosure } from '@chakra-ui/react';

type IconsRef = Record<string, SVGSVGElement>;

interface IconDetailOverlayData {
  icon: IconEntity | null;
  setIcon: (open: IconEntity | null) => void,
  isOpen: boolean;
  onOpen: () => void,
  onClose: () => void,
}

export const IconDetailOverlayOptionsContext = createContext<IconDetailOverlayData>({
  icon: null,
  setIcon: () => null,
  isOpen: false,
  onOpen: () => null,
  onClose: () => null,
});

export function IconDetailOverlayContext({children}): JSX.Element {
  const [icon, setIcon] = useState(null);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const value = useMemo(
    () => ({
      icon,
      setIcon,
      onClose,
      onOpen,
      isOpen,
    }),
    [
      icon,
      setIcon,
      onClose,
      onOpen,
      isOpen,
    ],
  );

  return <IconDetailOverlayOptionsContext.Provider
    value={value}>{children}</IconDetailOverlayOptionsContext.Provider>;
}

export function useIconDetailOverlayContext() {
  const context = useContext(IconDetailOverlayOptionsContext);
  if (context === undefined) {
    return {
      icon: null,
      setIcon: () => null,
      isOpen: false,
      onOpen: () => null,
      onClose: () => null,
    };
  }
  return context;
}
