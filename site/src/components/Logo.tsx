import { Icon, Link, Text } from '@chakra-ui/react';
import LogoImage from '../../public/logo.svg';
import NextLink from 'next/link';

const Logo = () => (
  <NextLink href="/" passHref>
    <Link display="flex" _hover={{ textDecoration: 'none' }}>
      <Icon boxSize={12} marginRight="8px">
        <LogoImage />
      </Icon>
      <Text fontSize="40px" fontWeight="normal" lineHeight="48px">
        Lucide
      </Text>
    </Link>
  </NextLink>
);

export default Logo;
