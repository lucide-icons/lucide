import { Box, Button, Flex, Icon, Text, useColorMode } from "@chakra-ui/core";
import { version } from "../../../package.json";
import { useKeyBindings } from "../lib/key";

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  useKeyBindings({
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
          px={8}
        >
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="4xl">Feather</Text>
            <Button marginLeft={2} variant="outline" size="sm">
              v{version}
            </Button>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Button variant="ghost" onClick={toggleColorMode}>
              <Icon name={colorMode == "light" ? "moon" : "sun"} size="24px" />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        {children}
      </Flex>
    </Box>
  );
};

export default Layout;
