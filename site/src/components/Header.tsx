import {Box, chakra, Divider, Flex, Heading, Link, Text} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import JSLogo from '../../public/framework-logos/js.svg';
import ReactLogo from '../../public/framework-logos/react.svg';
import VueLogo from '../../public/framework-logos/vue.svg';
import Vue3Logo from '../../public/framework-logos/vue-next.svg';
import PreactLogo from '../../public/framework-logos/preact.svg';
import AngularLogo from '../../public/framework-logos/angular.svg';
import FlutterLogo from '../../public/framework-logos/flutter.svg';
import SvelteLogo from '../../public/framework-logos/svelte.svg';
import {IconEntity} from '../types';
import theme from "../lib/theme";
import {SearchInput} from "./SearchInput";
import useSpacing from "../lib/useSpacing";

interface HeaderProps {
  data: IconEntity[];
  currentVersion: string;
}

const Header = ({data, currentVersion, contributors}: HeaderProps) => {
  const [zippingIcons, setZippingIcons] = useState(false);
  const { iconsRef } = useCustomizeIconContext();

  const downloadAllIcons = async () => {
    setZippingIcons(true);

    let iconEntries: IconContent[] = Object.entries(iconsRef.current).map(([name, svgEl]) => [
      name,
      svgEl.outerHTML,
    ]);

    // Fallback
    if (iconEntries.length === 0) {
      iconEntries = data.map(icon => [icon.name, icon.src]);
    }

    const zip = await generateZip(iconEntries);
    download(zip, 'lucide.zip');
    setZippingIcons(false);
  };

  const repositoryUrl = 'https://github.com/lucide-icons/lucide';
  const router = useRouter();

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
  const packageCount = packages.length;

  const releaseLink = 'https://github.com/lucide-icons/lucide/releases/tag/' + currentVersion;

  return (
    <Flex direction="column" align="center" justify="center" px={useSpacing('container')} pb={useSpacing('sectionY')}>
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

      <SearchInput count={data.length} onSubmit={redirectToIconList}/>

      <Flex
        display={['none', 'none', 'flex']}
        direction={['column', 'row']}
        textTransform="uppercase"
        fontWeight={200}
        mt={useSpacing('container')}
        align="center"
        justify="center"
      >
        <Box>
          <Link href="/icons">
            <strong>{iconCount}</strong> icons
          </Link>
        </Box>
        <Divider display={['none', 'block']} orientation="vertical" mx={3} height={5} />
        <Box>
          <Link href="https://github.com/lucide-icons/lucide/graphs/contributors" isExternal>
            <strong>{contributors}</strong> contributors
          </Link>
        </Box>
        <Divider display={['none', 'block']} orientation="vertical" mx={3} height={5} />
        <Box>
          <Link href="/packages">
            <strong>{packageCount}</strong> packages
          </Link>
        </Box>
        <Divider display={['none', 'block']} orientation="vertical" mx={3} height={5} />
        <Box>
          <Link href={releaseLink} isExternal>
            Version <strong>{currentVersion.substr(1)}</strong>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
