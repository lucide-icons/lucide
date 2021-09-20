import {
  Button,
  Flex,
  Box,
  Heading,
  Text,
  useColorMode,
  Divider,
  ButtonGroup,
  Stack
} from '@chakra-ui/react';
import Image from 'next/Image'
import { Code, FileText } from 'lucide-react';
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote';
import mdxComponents from '../lib/mdxComponents';

const Package = ({ name, description, image, shields, source, documentation }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      position="relative"
      width="100%"
      maxWidth="1152px"
      boxShadow="lg"
      bg={colorMode == 'light' ? 'gray-200' : 'gray.700'}
      padding={8}
    >
      <Flex
        justifyContent={{
          base: "center",
          md: "flex-start"
        }}
        flexDirection={{
          base: "column",
          md: "row"
        }}
      >
        <Flex
          marginRight={{
            base: 0,
            md: 8
          }}
          marginBottom={{
            base: 4,
            md: 0
          }}
          flex={3}
          align="center"
        >
          <Box marginX='auto'>
            <Image width={278} height={120} src={image} />
          </Box>
        </Flex>
        <Box
          flex={5}
          marginRight={4}
          textAlign={{
            base: "center",
            md: "left"
          }}
        >
          <Heading as="h2" fontSize='3xl' mb={2}>
            {name}
          </Heading>
          <Text mb={3}>{ description }</Text>
          <ButtonGroup spacing={2}>
            {shields.map((attrs, index) => (
              <img {...attrs} key={ index } />
            ))}
          </ButtonGroup>
        </Box>
        <Flex
          placeItems="center"
          align='center'
          marginTop={{
            base: 4,
            md: 0
          }}
        >
          <ButtonGroup
            // as={Stack}
            // spacing={8}
            // align='center'
            flexDirection={{
              base: "column",
              lg: "initial"
            }}
            margin='auto'
            justifyContent={{
              base: "center",
              sm: "flex-start"
            }}
          >
            <Link passHref href={documentation} >
              <Button
                as='a'
                variant="solid"
                textDecoration="none"
                leftIcon={<FileText />}
                my={2}
              >
                Documentation
              </Button>
            </Link>
            <Link passHref href={source} >
            <Button
              as="a"
              variant="solid"
              textDecoration="none"
              leftIcon={<Code />}
              my={2}
            >
              Source
            </Button>
            </Link>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Package;
