import {
  Box,
  Divider,
  Flex,
  Link,
  useColorMode,
  useColorModeValue,
  IconButton,
  useBreakpointValue,
  BoxProps,
} from '@chakra-ui/react';
import { useKeyBindings } from '../lib/key';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useMobileNavigationContext, useMobileNavigationValue } from './MobileNavigationProvider';
import Logo from './Logo';

interface LayoutProps extends BoxProps {
  aside?: BoxProps['children'];
  keyBindings?: Parameters<typeof useKeyBindings>[0];
}

const Layout = ({ aside, children, keyBindings }: LayoutProps) => {
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
    color: 'current',
    ml: '3',
  };

  function setQuery(query) {
    router.push(
      {
        pathname: '/',
        query: { query: query },
      },
      undefined,
      { shallow: true }
    );
  }

  useKeyBindings(
    keyBindings || {
      Escape: {
        fn: () => setQuery(''),
      },
      t: {
        fn: () => toggleColorMode(),
      },
    }
  );

  return (
    <Box h="100vh">
      <Flex mb={16} w="full">
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
                <NextLink href="/docs" passHref>
                  <Link marginRight={12} fontSize="xl">
                    Documentation
                  </Link>
                </NextLink>
                <NextLink href="/packages" passHref>
                  <Link marginRight={12} fontSize="xl">
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
                  marginRight={6}
                  fontSize="xl"
                >
                  Github
                </Link>
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
      <Flex>
        {aside ? (
          <Box as="aside" marginRight={{ base: 0, lg: -240 }}>
            {aside}
          </Box>
        ) : null}
        <Flex margin="0 auto" direction="column" maxW="1250px" px={5} width="100%">
          {children}
          <Divider mb={6} mt={12} />
          <p style={{ alignSelf: 'center' }}>
            <a href="https://vercel.com?utm_source=lucide&utm_campaign=oss">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vercel.svg" alt="Powered by Vercel" width="200" />
            </a>
          </p>
          <br />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
