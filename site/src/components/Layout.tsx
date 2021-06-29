import { Box, Divider, Flex, Text, Link, Icon, useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { useKeyBindings } from "../lib/key";
import { useRouter } from "next/router";
import NextLink from "next/link"
import { Moon, Sun } from 'lucide-react';
import Logo from 'babel-loader!react-svg-loader?jsx=true!../../public/logo.svg';

const Layout = ({ children }) => {
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
      <Flex mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={5}
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
            marginRight={6}
            fontSize="xl"
            href='/docs'
          >
            Documentation
          </Link>
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
      <Flex margin="0 auto" direction="column" maxW="1250px" px={5}>
        {children}
        <Divider mb={6} mt={12} />
        <p style={{ alignSelf: "center" }}>
          <a href="https://vercel.com?utm_source=lucide&utm_campaign=oss">
            <img src="/vercel.svg" alt="Powered by Vercel" width="200" />
          </a>
        </p>
        <br />
      </Flex>
    </Box>
  );
};

export default Layout;
