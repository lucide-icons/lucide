import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link,
  Box,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import menuItems from '../static/menuItems';
import Logo from './Logo';
import { useMobileNavigationContext } from './MobileNavigationProvider';

const MobileMenu = ({ children }: { children?: ReactNode }): JSX.Element => {
  const { isOpen, onClose } = useMobileNavigationContext();
  const router = useRouter();

  useEffect(() => {
    if (router.route && isOpen) {
      onClose();
    }
  }, [router.route]);

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop={3.5} marginRight={3} />
        <DrawerHeader>
          <Logo />
        </DrawerHeader>
        <DrawerBody>
          <Box mb={4}>
            {menuItems.map(menuItem => (
              <Link
                href={menuItem.href}
                isExternal={menuItem.isExternal}
                fontSize="lg"
                fontWeight="bold"
                display="block"
                mb={2}
                key={menuItem.name}
              >
                {menuItem.name}
              </Link>
            ))}
          </Box>
          <Divider mt={2} />
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
