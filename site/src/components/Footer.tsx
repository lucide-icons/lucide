import {Flex, FlexProps, Link, useStyleConfig} from '@chakra-ui/react';
import menuItems from "../static/footerMenuItems";
import MenuItem from './MenuItem';
import NextLink from 'next/link';

interface FooterProps extends FlexProps {
  variant?: string;
}

const Footer = ({variant, ...rest}: FooterProps) => {
  const styles = useStyleConfig('Footer', {variant})

  return (
    <Flex __css={styles} {...rest} gap={[2, 3, 4]}>
      {menuItems.map(menuItem => (<MenuItem {...{menuItem}} />))}
      <NextLink href="https://vercel.com?utm_source=lucide&utm_campaign=oss" passHref>
        <Link>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vercel.svg" alt="Powered by Vercel" width="150"/>
        </Link>
      </NextLink>
    </Flex>
  );
};

export default Footer;
