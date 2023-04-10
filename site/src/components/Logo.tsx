import { Icon, Link, Text } from '@chakra-ui/react';
import LogoImage from '../../public/logo.svg';

const Logo = () => (
  <Link display="flex" href="/" _hover={{ textDecoration: 'none' }}>
    <Icon boxSize={12} marginRight="8px">
      <LogoImage />
    </Icon>
    <Text fontSize="40px" fontWeight="normal" lineHeight="48px">
      Lucide
    </Text>
  </Link>
);

export default Logo;
