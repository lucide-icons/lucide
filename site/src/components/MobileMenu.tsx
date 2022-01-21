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
            <NextLink href="/docs" passHref>
              <Link fontSize="lg" fontWeight="bold" display="block" mb={2}>
                Documentation
              </Link>
            </NextLink>
            <NextLink href="/packages" passHref>
              <Link marginRight={12} fontSize="lg" fontWeight="bold" display="block" mb={2}>
                Packages
              </Link>
            </NextLink>
            <NextLink href="/license" passHref>
              <Link marginRight={12} fontSize="xl">
                License
              </Link>
            </NextLink>
            <Link
              href="https://github.com/lucide-icons/lucide"
              isExternal
              fontSize="lg"
              fontWeight="bold"
              display="block"
              mb={2}
            >
              Github
            </Link>
          </Box>
          <Divider mt={2} />
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
