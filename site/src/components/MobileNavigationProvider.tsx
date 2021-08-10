import { useDisclosure } from '@chakra-ui/react';
import { createContext, useState, useContext } from 'react'

const MobileNavigationContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {}
})

function MobileNavigationProvider({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <MobileNavigationContext.Provider value={{ isOpen, onOpen, onClose }}>{children}</MobileNavigationContext.Provider>
}

const useMobileNavigationContext = () => useContext(MobileNavigationContext);

export { MobileNavigationProvider, useMobileNavigationContext }
