import {createContext, useContext, useMemo, useState} from 'react';
import {IconEntity} from "../types";
import {useDisclosure} from '@chakra-ui/react';

interface IconDetailOverlayGetData {
  icon: IconEntity | null;
  isOpen: boolean;
}
interface IconDetailOverlaySetData {
  setIcon: (open: IconEntity | null) => void,
  onOpen: () => void,
  onClose: () => void,
}

export const IconDetailOverlayGetOptionsContext = createContext<IconDetailOverlayGetData>({
  icon: null,
  isOpen: false,
});

export const IconDetailOverlaySetOptionsContext = createContext<IconDetailOverlaySetData>({
  setIcon: () => null,
  onOpen: () => null,
  onClose: () => null,
});

export function IconDetailOverlayContext({children}): JSX.Element {
  const [icon, setIcon] = useState(null);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const getValue = useMemo(
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

  const setValue = useMemo(
    () => ({
      setIcon,
      onClose,
      onOpen,
    }),
    [
      setIcon,
      onClose,
      onOpen,
    ],
  );

  return (
    <IconDetailOverlayGetOptionsContext.Provider value={getValue}>
      <IconDetailOverlaySetOptionsContext.Provider value={setValue}>
        {children}
      </IconDetailOverlaySetOptionsContext.Provider>
    </IconDetailOverlayGetOptionsContext.Provider>
  );
}


export function useIconDetailOverlayGetContext() {
  const context = useContext(IconDetailOverlayGetOptionsContext);
  if (context === undefined) {
    return {
      icon: null,
      isOpen: false,
    };
  }
  return context;
}

export function useIconDetailOverlaySetContext() {
  const context = useContext(IconDetailOverlaySetOptionsContext);
  if (context === undefined) {
    return {
      setIcon: () => null,
      onClose: () => null,
      onOpen: () => null,
    };
  }
  return context;
}
