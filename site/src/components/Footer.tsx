import {Flex, FlexProps, Link, useStyleConfig} from '@chakra-ui/react';
import menuItems from "../static/footerMenuItems";
import MenuItem from './MenuItem';
import NextLink from 'next/link';
import useSpacing from "../lib/useSpacing";

interface FooterProps extends FlexProps {
  variant?: string;
}

const Footer = ({variant, ...rest}: FooterProps) => {
  const styles = useStyleConfig('Footer', {variant})

  return (
    <Flex __css={styles} {...rest} gap={useSpacing('container')}>
      {menuItems.map(menuItem => (<MenuItem {...{menuItem, menuName: 'footer'}} />))}
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
