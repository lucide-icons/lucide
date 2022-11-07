/* eslint-disable @typescript-eslint/no-empty-function */
import { useDisclosure } from '@chakra-ui/react';
import { createContext, useContext, useMemo } from 'react';

const MobileNavigationContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  toggleMobileMenu: () => {},
});

export function MobileNavigationProvider({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleMobileMenu = () => (isOpen ? onClose() : onOpen());

  return (
    <MobileNavigationContext.Provider value={{ isOpen, onOpen, onClose, toggleMobileMenu }}>
      {children}
    </MobileNavigationContext.Provider>
  );
}

export const useMobileNavigationContext = () => useContext(MobileNavigationContext);

export const useMobileNavigationValue = (intialValue, activeValue) => {
  const { isOpen } = useMobileNavigationContext();
  return useMemo(() => (isOpen ? activeValue : intialValue), [isOpen]);
};
