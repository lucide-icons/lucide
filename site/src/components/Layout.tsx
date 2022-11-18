import {
  Box,
  BoxProps,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Spacer,
  Switch,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import {useKeyBindings} from '../lib/key';
import {useRouter} from 'next/router';
import {Menu, Moon, Sun, X} from 'lucide-react';
import {useMobileNavigationContext, useMobileNavigationValue} from './MobileNavigationProvider';
import Footer from './Footer';
import Logo from './Logo';
import menuItems from "../static/menuItems";
import MenuItem from "./MenuItem";

interface LayoutProps extends BoxProps {
  aside?: BoxProps['children'];
}

const Layout = ({aside, children}: LayoutProps) => {
  const router = useRouter();
  const {toggleMobileMenu} = useMobileNavigationContext();
  const {toggleColorMode} = useColorMode();
  const currentColorMode = useColorModeValue('dark', 'light');
  const colorModeChecked = useColorModeValue(false, true);
  const MobileMenuToggle = useMobileNavigationValue(Menu, X);
  const showBaseNavigation = useBreakpointValue({base: false, md: true});
  const IconbuttonProps = {
    size: 'md',
    fontSize: 'lg',
    variant: 'ghost',
    ml: '3',
  };
  const ToggleIconProps = {
    width: '12px',
    height: '12px',
    color: 'white',
  };
  const ToggleIconBoxProps = {
    inset: '3px',
    top: '4px',
    position: 'absolute',
    pointerEvents: 'none',
  };

  function setQuery(query) {
    router.push({
        pathname: '/',
        query: {query: query},
      },
      undefined,
      {shallow: true})
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
      <Flex mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          margin="0 auto"
          w="full"
          py={{base: 4}}
          px={{base: 5}}
        >
          <Flex justifyContent="center" alignItems="center">
            <Logo/>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {showBaseNavigation ? (
              <>
                {menuItems.map(menuItem => (<MenuItem {...{menuItem, menuName: 'navbar', fontSize: 'lg'}} />))}
              </>
            ) : null}
            <FormControl display='flex' alignItems='center' position="relative">
              <VisuallyHidden>
                <FormLabel htmlFor='switch-color-mode' mb='0'>
                  Switch to {currentColorMode} mode
                </FormLabel>
              </VisuallyHidden>
              <Switch id='switch-color-mode'
                      defaultChecked={colorModeChecked}
                      variant="colorMode"
                      colorScheme="brand"
                      onChange={toggleColorMode}
              />
              <Box {...ToggleIconBoxProps} right="auto">
                <Sun {...ToggleIconProps} />
              </Box>
              <Box {...ToggleIconBoxProps} left="auto">
                <Moon {...ToggleIconProps} />
              </Box>
            </FormControl>
            {!showBaseNavigation ? (
              <IconButton
                aria-label={`Open Mobile menu`}
                onClick={toggleMobileMenu}
                {...IconbuttonProps}
                icon={<MobileMenuToggle/>}
              />
            ) : null}
          </Flex>
        </Flex>
      </Flex>
      <Flex grow={1}>
        {aside ? <Box as="aside" marginRight={{base: 0, lg: -240,}}>{aside}</Box> : null}
        <Flex margin="0 auto" direction="column" width="100%">
          {children}
        </Flex>
      </Flex>
      <Spacer mt={[6, 12]} />
      <Footer/>
    </Flex>
  );
};

export default Layout;
