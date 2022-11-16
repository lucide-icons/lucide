import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {ReactNode, useEffect} from 'react';
import Logo from './Logo';
import {useMobileNavigationContext} from './MobileNavigationProvider';
import menuItems from "../static/menuItems";
import MenuItem from "./MenuItem";

const MobileMenu = ({children}: { children?: ReactNode }): JSX.Element => {
  const {isOpen, onClose} = useMobileNavigationContext();
  const router = useRouter();

  useEffect(() => {
    if (router.route && isOpen) {
      onClose();
    }
  }, [router.route]);

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerCloseButton marginTop={3.5} marginRight={3}/>
        <DrawerHeader>
          <Logo/>
        </DrawerHeader>
        <DrawerBody>
          <Flex direction="column" mb={4}>
            {menuItems.map(menuItem => (<MenuItem {...{menuItem, fontSize: 'lg'}} />))}
          </Flex>
          <Divider mt={2}/>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
