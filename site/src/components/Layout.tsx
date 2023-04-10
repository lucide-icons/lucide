import {
  Box,
  Divider,
  Flex,
  Link,
  useColorMode,
  useColorModeValue,
  IconButton,
  useBreakpointValue,
  Spacer,
  BoxProps,
} from '@chakra-ui/react';
import { useKeyBindings } from '../lib/key';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useMobileNavigationContext, useMobileNavigationValue } from './MobileNavigationProvider';
import Logo from './Logo';
import Footer from './Footer';
import menuItems from '../static/menuItems';

interface LayoutProps extends BoxProps {
  aside?: BoxProps['children'];
}

const Layout = ({ aside, children }: LayoutProps) => {
  const router = useRouter();
  const { toggleMobileMenu } = useMobileNavigationContext();
  const { toggleColorMode } = useColorMode();
  const currentColorMode = useColorModeValue('dark', 'light');
  const ColorModeToggle = useColorModeValue(Moon, Sun);
  const MobileMenuToggle = useMobileNavigationValue(Menu, X);
  const showBaseNavigation = useBreakpointValue({ base: false, md: true });
  const IconbuttonProps = {
    size: 'md',
    fontSize: 'lg',
    variant: 'ghost',
    ml: '3',
  };

  function setQuery(query) {
    router.push(
      {
        pathname: '/',
        query: { query: query },
      },
      undefined,
      { shallow: true },
    );
  }

  useKeyBindings({
    Escape: {
      fn: () => setQuery(''),
    },
    KeyT: {
      fn: () => toggleColorMode(),
    },
  });

  return (
    <Flex minH="100vh" direction="column">
      <Flex w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          margin="0 auto"
          w="full"
          px={5}
        >
          <Flex justifyContent="center" alignItems="center">
            <Logo />
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {showBaseNavigation ? (
              <>
                {menuItems.map(menuItem => {
                  if (menuItem.isExternal) {
                    return (
                      <Link
                        href={menuItem.href}
                        isExternal
                        marginRight={6}
                        fontSize="lg"
                        key={menuItem.name}
                      >
                        {menuItem.name}
                      </Link>
                    );
                  }
                  return (
                    <Link as={NextLink} href={menuItem.href} key={menuItem.name} marginRight={8} fontSize="lg">
                      {menuItem.name}
                    </Link>
                  );
                })}
              </>
            ) : null}
            <IconButton
              aria-label={`Switch to ${currentColorMode} mode`}
              onClick={toggleColorMode}
              {...IconbuttonProps}
              icon={<ColorModeToggle />}
            />
            {!showBaseNavigation ? (
              <IconButton
                aria-label={`Open Mobile menu`}
                onClick={toggleMobileMenu}
                {...IconbuttonProps}
                icon={<MobileMenuToggle />}
              />
            ) : null}
          </Flex>
        </Flex>
      </Flex>
      <Flex grow={1}>
        {aside ? (
          <Box as="aside" marginRight={{ base: 0, lg: -240 }}>
            {aside}
          </Box>
        ) : null}
        <Flex margin="0 auto" direction="column" width="100%">
          {children}
        </Flex>
      </Flex>
      <Footer/>
    </Flex>
  );
};

export default Layout;
