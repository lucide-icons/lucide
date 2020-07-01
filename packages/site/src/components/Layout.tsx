import { Box, Divider, Flex, Text } from "@chakra-ui/core";
import { StringParam, useQueryParam } from "use-query-params";

const Layout = ({ children }) => {
  const [, setQuery] = useQueryParam("query", StringParam);

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
            <Text
              fontSize="4xl"
              onClick={() => setQuery("")}
              style={{ cursor: "pointer" }}
            >
              Featherity
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        {children}
        <Divider marginTop={10} marginBottom={10} />
      </Flex>
    </Box>
  );
};

export default Layout;
