import { Button, Flex, Box, Image, useColorMode } from '@chakra-ui/react';

const Package = () => {
  const { colorMode } = useColorMode();
  // const props = {
  //   title: 'lucide',
  //   description: '',
  // };
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      position="relative"
      width="full"
      boxShadow="xl"
      bg={colorMode == 'light' ? 'white' : 'gray.700'}
      padding={8}
    >
      <Flex>
        <Box>
          <Image height={120} src="/package-logos/lucide-react-small.svg" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Package;
