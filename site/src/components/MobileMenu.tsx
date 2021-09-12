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
import { useEffect } from 'react';
import HeadingTreeMenu from './HeadingTreeMenu';
import Logo from './Logo';
import { useMobileNavigationContext } from './MobileNavigationProvider';

const MobileMenu = () => {
  const { isOpen, onClose } = useMobileNavigationContext();
  const router = useRouter();

  useEffect(() => {
    if (router.route && isOpen) {
      onClose();
    }
  }, [router.route]);

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop={3.5} marginRight={3} />
        <DrawerHeader>
          <Logo />
        </DrawerHeader>
        <DrawerBody>
          <Box mb={4}>
            <NextLink href="/docs" passHref>
              <Link fontSize="xl" fontWeight="bold">
                Documentation
              </Link>
            </NextLink>
          </Box>
          <Box mb={4}>
            <Link
              href="https://github.com/lucide-icons/lucide"
              isExternal
              fontSize="xl"
              fontWeight="bold"
            >
              Github
            </Link>
          </Box>
          <Divider />
          <HeadingTreeMenu />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
