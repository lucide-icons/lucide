import { Button, Flex, Link, WrapItem, Text, Wrap, Heading, Icon } from '@chakra-ui/react';
import download from 'downloadjs';
import JSZip from 'jszip';
import { Download, Github } from 'lucide-react';
import NextLink from 'next/link';
import { IconCustomizerDrawer } from './IconCustomizerDrawer';
import JSLogo from '../../public/framework-logos/js.svg';
import ReactLogo from '../../public/framework-logos/react.svg';
import VueLogo from '../../public/framework-logos/vue.svg';
import Vue3Logo from '../../public/framework-logos/vue-next.svg';
import PreactLogo from '../../public/framework-logos/preact.svg';
import AngularLogo from '../../public/framework-logos/angular.svg';
import FlutterLogo from '../../public/framework-logos/flutter.svg';
import SvelteLogo from '../../public/framework-logos/svelte.svg';
import LaravelLogo from '../../public/framework-logos/laravel.svg';
import { IconEntity } from '../types';

function generateZip(icons: IconEntity) {
  const zip = new JSZip();
  Object.values(icons).forEach(icon => zip.file(`${icon.name}.svg`, icon.src));
  return zip.generateAsync({ type: 'blob' });
}

const repositoryUrl = 'https://github.com/lucide-icons/lucide';

const packages = [
  {
    name: 'lucide',
    Logo: JSLogo,
    href: '/docs/lucide',
  },
  {
    name: 'lucide-react',
    Logo: ReactLogo,
    href: '/docs/lucide-react',
  },
  {
    name: 'lucide-vue',
    Logo: VueLogo,
    href: '/docs/lucide-vue',
  },
  {
    name: 'lucide-vue-next',
    Logo: Vue3Logo,
    href: '/docs/lucide-vue-next',
  },
  {
    name: 'lucide-svelte',
    Logo: SvelteLogo,
    href: '/docs/lucide-svelte',
  },
  {
    name: 'lucide-preact',
    Logo: PreactLogo,
    href: '/docs/lucide-preact',
  },
  {
    name: 'lucide-angular',
    Logo: AngularLogo,
    href: '/docs/lucide-angular',
  },
  {
    name: 'lucide-flutter',
    Logo: FlutterLogo,
    href: '/docs/lucide-flutter',
  },
  {
    name: 'lucide-laravel',
    Logo: LaravelLogo,
    href: 'https://github.com/mallardduck/blade-lucide-icons',
  },
];

const Header = ({ data }) => {
  const downloadAllIcons = async () => {
    const zip = await generateZip(data);
    download(zip, 'lucide.zip');
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Heading as="h1" fontSize="4xl" mb="4" textAlign="center">
        Beautiful &amp; consistent icon toolkit made by the community.
      </Heading>
      <Text fontSize="lg" as="p" textAlign="center" mb="1">
        Open-source project and a fork of{' '}
        <Link href="https://github.com/feathericons/feather" isExternal>
          Feather Icons
        </Link>
        . <br />
        We're expanding the icon set as much as possible while keeping it nice-looking -{' '}
        <Link href={repositoryUrl} isExternal>
          join us
        </Link>
        !
      </Text>
      <Wrap
        marginTop={4}
        marginBottom={6}
        spacing={{ base: 4, lg: 6 }}
        justify="center"
        align="center"
      >
        <WrapItem flexBasis="100%" style={{ marginBottom: 0 }}>
          <NextLink href="/packages" passHref>
            <Link _hover={{ opacity: 0.8 }} marginX="auto">
              <Text fontSize="md" opacity={0.5} as="p" textAlign="center" width="100%">
                Available for:
              </Text>
            </Link>
          </NextLink>
        </WrapItem>
        {packages.map(({ name, href, Logo }) => (
          <WrapItem key={name}>
            <NextLink href={href} key={name} passHref>
              <Link _hover={{ opacity: 0.8 }}>
                <Logo />
              </Link>
            </NextLink>
          </WrapItem>
        ))}
      </Wrap>
      <Wrap marginTop={3} marginBottom={12} spacing="15px" justify="center">
        <WrapItem>
          <Button leftIcon={<Download />} size="lg" onClick={downloadAllIcons}>
            Download all
          </Button>
        </WrapItem>
        <WrapItem>
          <IconCustomizerDrawer />
        </WrapItem>
        <WrapItem>
          <Button as="a" leftIcon={<Github />} size="lg" href={repositoryUrl} target="__blank">
            Github
          </Button>
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Header;
