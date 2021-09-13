import {
  Button,
  Flex,
  Box,
  Image,
  Heading,
  Text,
  useColorMode,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';
import { Code, FileText } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote';
import mdxComponents from '../lib/mdxComponents';

const Package = ({ shields }) => {
  const { colorMode } = useColorMode();
  const props = {
    title: 'lucide',
    description: 'This is a small description',
    image: '/package-logos/lucide-react-small.svg',
  };

  const { title, description, image } = props;
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      position="relative"
      width="100%"
      maxWidth="1152px"
      boxShadow="lg"
      marginX="auto"
      bg={colorMode == 'light' ? 'gray-200' : 'gray.700'}
      padding={8}
    >
      <Flex justifyContent="flex-start">
        <Box marginRight={8} flex={3}>
          <Image height={120} src={image} />
        </Box>
        <Box flex={5}>
          <Heading as="h3" mb={2}>
            {title}
          </Heading>
          <Text mb={2}>{description}</Text>
          <ButtonGroup spacing={2}>
            {shields.map((Shield, index) => (
              <Shield key={index} />
            ))}
          </ButtonGroup>
        </Box>
        <Flex placeItems="center">
          <ButtonGroup spacing={8}>
            <Button
              as="a"
              href="https://github.com/lucide-icons/lucide/tree/master/packages/lucide#readme"
              variant="solid"
              textDecoration="none"
              leftIcon={<FileText />}
            >
              Documentation
            </Button>
            <Button
              as="a"
              href="https://github.com/lucide-icons/lucide/tree/master/packages/lucide"
              variant="solid"
              textDecoration="none"
              leftIcon={<Code />}
            >
              Source
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Package;
