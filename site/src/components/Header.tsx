import {Box, chakra, Divider, Flex, Heading, Link, Text, Wrap, WrapItem} from '@chakra-ui/react';
import NextLink from 'next/link';
import JSLogo from '../../public/framework-logos/js.svg';
import ReactLogo from '../../public/framework-logos/react.svg';
import VueLogo from '../../public/framework-logos/vue.svg';
import Vue3Logo from '../../public/framework-logos/vue-next.svg';
import PreactLogo from '../../public/framework-logos/preact.svg';
import AngularLogo from '../../public/framework-logos/angular.svg';
import FlutterLogo from '../../public/framework-logos/flutter.svg';
import SvelteLogo from '../../public/framework-logos/svelte.svg';
import {IconContent, IconEntity} from '../types';
import theme from "../lib/theme";
import {SearchInput} from "./SearchInput";

interface HeaderProps {
  data: IconEntity[];
}

const Header = ({data}: HeaderProps) => {
  const repositoryUrl = 'https://github.com/lucide-icons/lucide';

  const packages = [
    {
      name: 'lucide',
      Logo: JSLogo,
      href: '/docs/lucide',
      label: 'Lucide documentation for JavaScript',
    },
    {
      name: 'lucide-react',
      Logo: ReactLogo,
      href: '/docs/lucide-react',
      label: 'Lucide documentation for React',
    },
    {
      name: 'lucide-react-native',
      Logo: ReactLogo,
      href: '/docs/lucide-react-native',
      label: 'Lucide documentation for React Native',
    },
    {
      name: 'lucide-vue',
      Logo: VueLogo,
      href: '/docs/lucide-vue',
      label: 'Lucide documentation for Vue',
    },
    {
      name: 'lucide-vue-next',
      Logo: Vue3Logo,
      href: '/docs/lucide-vue-next',
      label: 'Lucide documentation for Vue 3',
    },
    {
      name: 'lucide-svelte',
      Logo: SvelteLogo,
      href: '/docs/lucide-svelte',
      label: 'Lucide documentation for Svelte',
    },
    {
      name: 'lucide-preact',
      Logo: PreactLogo,
      href: '/docs/lucide-preact',
      label: 'Lucide documentation for Preact',
    },
    {
      name: 'lucide-angular',
      Logo: AngularLogo,
      href: '/docs/lucide-angular',
      label: 'Lucide documentation for Angluar',
    },
    {
      name: 'lucide-flutter',
      Logo: FlutterLogo,
      href: '/docs/lucide-flutter',
      label: 'Lucide documentation for Flutter',
    },
  ];

  const redirectToIconList = (e) => {
    return router.push('/icons?search=' + e);
  };

  const iconCount = data.length;
  // @TODO dynamically fetch these metrics.
  const contributorCount = 36;
  const packageCount = packages.length;
  const categoryCount = 47;
  const version = '0.98.0';

  return (
    <Flex direction="column" align="center" justify="center">
      <Heading as="h1" fontSize="4xl" mb="4" textAlign="center" maxWidth="650px" fontWeight={500}>
        Beautiful &amp; consistent icon toolkit <chakra.span color={theme.colors.brand.DEFAULT}>made
        by the community.</chakra.span>
      </Heading>
      <Text fontSize="lg" as="p" textAlign="center" mb="1">
        Open-source project and a fork of{' '}
        <Link href="https://github.com/feathericons/feather" isExternal>
          Feather Icons
        </Link>
        . <br/>
        We're expanding the icon set as much as possible while keeping it nice-looking -{' '}
        <Link href={repositoryUrl} isExternal>
          join us
        </Link>
        !
      </Text>
      <Wrap
        marginTop={4}
        marginBottom={6}
        spacing={{base: 4, lg: 6}}
        justify="center"
        align="center"
      >
        <WrapItem flexBasis="100%" style={{marginBottom: 0}}>
          <NextLink href="/packages" passHref>
            <Link _hover={{opacity: 0.8}} marginX="auto">
              <Text fontSize="md" opacity={0.5} as="p" textAlign="center" width="100%">
                Available for:
              </Text>
            </Link>
          </NextLink>
        </WrapItem>
        {packages.map(({name, href, Logo, label}) => (
          <WrapItem key={name}>
            <NextLink href={href} key={name} passHref>
              <Link _hover={{opacity: 0.8}} aria-label={label}>
                <Logo/>
              </Link>
            </NextLink>
          </WrapItem>
        ))}
        <WrapItem>
          <NextLink href="/packages" passHref>
            <Link _hover={{opacity: 0.8}} marginX="auto">
              <Text fontSize="md" opacity={0.5}>More options</Text>
            </Link>
          </NextLink>
        </WrapItem>
      </Wrap>

      <SearchInput count={data.length} onSubmit={redirectToIconList}/>

      <Flex
        display={['none', 'none', 'flex']}
        direction={['column', 'row']}
        textTransform="uppercase"
        fontWeight={200}
        mt={[2, 3, 4]}
        align="center"
        justify="center"
      >
        <Box><strong>{iconCount}</strong> icons</Box>
        <Divider display={['none', 'block']} orientation="vertical" mx={3} height={5} />
        <Box><strong>{contributorCount}</strong> contributors</Box>
        <Divider display={['none', 'block']} orientation="vertical" mx={3} height={5} />
        <Box><strong>{categoryCount}</strong> categories</Box>
        <Divider display={['none', 'block']} orientation="vertical" mx={3} height={5} />
        <Box><strong>{packageCount}</strong> packages</Box>
        <Divider display={['none', 'block']} orientation="vertical" mx={3} height={5} />
        <Box>Version <strong>{version}</strong></Box>
      </Flex>
    </Flex>
  );
};

export default Header;
