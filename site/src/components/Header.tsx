import { chakra, Box, Divider, Flex, Link, Text, Heading } from '@chakra-ui/react';
import { IconEntity } from '../types';
import useSpacing from "../lib/useSpacing";
import {SearchInput} from "./SearchInput";
import packagesData from '../data/packageData.json';
import {useRouter} from 'next/router';

interface HeaderProps {
  data: IconEntity[];
  currentVersion: string;
  contributors: number;
}

const Header = ({ data, currentVersion, contributors }: HeaderProps) => {
  const repositoryUrl = 'https://github.com/lucide-icons/lucide';
  const iconCount = data.length;
  const packageCount = Object.keys(packagesData).length;
  const releaseLink = 'https://github.com/lucide-icons/lucide/releases/tag/' + currentVersion;
  const router = useRouter();
  const redirectToIconList = (e) => {
    return router.push(
      '/icons?search=' + e,
      undefined,
      {shallow: true},
    );
  };

  const containerSpacing = useSpacing('container');

  return (
    <Box maxW="1250px" mx="auto">
      <Flex direction="column" align="center" justify="center" py={12}>
        <Heading as="h1" fontSize="4xl" mb="4" textAlign="center" maxWidth="650px" fontWeight={500}>
          Beautiful &amp; consistent icon toolkit <chakra.span color='brand.500'>made by the community.</chakra.span>
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

        <SearchInput count={data.length} onChange={redirectToIconList} />

        <Flex
          display={['none', 'none', 'flex']}
          direction={['column', 'row']}
          textTransform="uppercase"
          fontWeight={200}
          mt={containerSpacing}
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
    </Box>
  );
};

export default Header;
