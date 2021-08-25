import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link
} from '@chakra-ui/react';
import Logo from './Logo';
import { useMobileNavigationContext } from './MobileNavigationProvider';

const HeadingMenu = () => {
  const { isOpen, onClose } = useMobileNavigationContext();

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop={3.5} marginRight={3} />
        <DrawerHeader>
          <Logo />
        </DrawerHeader>
        <DrawerBody>
          <Link marginRight={6} fontSize="xl" href="/docs">
            Documentation
          </Link>
          <Link
            href="https://github.com/lucide-icons/lucide"
            isExternal
            marginRight={6}
            fontSize="xl"
          >
            Github
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default HeadingMenu;
