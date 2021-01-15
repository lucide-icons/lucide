import { Box, Divider, Flex, Text, Link, Icon, useColorMode, useColorModeValue, IconButton, Button, WrapItem, Wrap } from "@chakra-ui/core";
import { useKeyBindings } from "../lib/key";
import { useRouter } from "next/router";
import NextLink from "next/link"
import { Moon, Sun } from 'lucide-react';
import Logo from 'babel-loader!react-svg-loader?jsx=true!../../public/logo.svg';
import { useCallback } from "react";

const Layout = ({ children, maxWidth = "1250px" }) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light')
  const ColorModeToggle = useColorModeValue(Moon, Sun);

  function setQuery(query){
    router.push({
      pathname: '/',
      query: { query: query }
    }).then();
  }

  useKeyBindings({
    Escape: {
      fn: () => setQuery(""),
    },
    KeyT: {
      fn: () => toggleColorMode(),
    },
  });

  return (
    <Box h="100vh">
      <Flex w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW={maxWidth}
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex justifyContent="center" alignItems="center">
            <NextLink href="/" passHref>
              <Link display="flex" _hover={{textDecoration: 'none'}}>
                <Icon boxSize={12} marginRight="8px">
                  <Logo/>
                </Icon>
                <Text
                  fontSize="40px"
                  lineHeight="48px"
                >
                  Lucide
                </Text>
              </Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
          <Link
            href="https://github.com/lucide-icons/lucide"
            isExternal
            marginRight={6}
            fontSize="xl"
          >
            Github
          </Link>
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            ml="3"
            onClick={toggleColorMode}
            icon={<ColorModeToggle />}
          />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW={maxWidth} px={8} marginBottom={8}>
        {children}
        <Divider marginTop={4} marginBottom={4}/>
        <Wrap marginBottom={4}>
          <WrapItem>
            <Button variant="ghost" onClick={() => router.push('/edit/categories')}>Edit Categories</Button>
          </WrapItem>
        </Wrap >
      </Flex>
    </Box>
  );
};

export default Layout;
