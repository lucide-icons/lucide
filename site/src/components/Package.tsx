import {
  Button,
  Flex,
  Box,
  Heading,
  Text,
  useColorMode,
  ButtonGroup,
} from '@chakra-ui/react';
import { Code, FileText } from 'lucide-react';
import Link from 'next/link';

interface Shield {
  alt: string
  src: string
  href: string
}
export interface PackageItem {
  name: string
  description: string
  icon: string
  shields: Shield[]
  source: string
  documentation: string
  order?: number
  private?: boolean
  flutter?: object
}


const Package = ({ name, description, icon, shields, source, documentation }: PackageItem) => {
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
          base: 'center',
          md: 'flex-start',
        }}
        flexDirection={{
          base: 'column',
          md: 'row',
        }}
      >
        <Flex
          marginRight={{
            base: 0,
            md: 8,
          }}
          marginBottom={{
            base: 4,
            md: 0,
          }}
          flex={3}
          align="center"
        >
          <Box marginX="auto">
            <svg viewBox="0 0 78 32" width={278} height={120} fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="78" height="32" rx="5" fill="#fff"/>
              <image href="/logo-icon.svg" height="24" width="24" y="4" x="8"/>
              <circle cx="39" cy="16" r="2" fill="#DDD"/>
              <image href={icon} height="24" width="24" y="4" x="47"/>
            </svg>
          </Box>
        </Flex>
        <Box
          flex={5}
          marginRight={4}
          textAlign={{
            base: 'center',
            md: 'left',
          }}
        >
          <Heading as="h2" fontSize="3xl" mb={2}>
            {name}
          </Heading>
          <Text mb={3}>{description}</Text>
          <ButtonGroup spacing={2}>
            {shields.map(({ alt, src, href }, index) => (
              <Link key={index} href={href} passHref>
                <a target="_blank">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img {...{ alt, src }} key={index} />
                </a>
              </Link>
            ))}
          </ButtonGroup>
        </Box>
        <Flex
          placeItems="center"
          align="center"
          marginTop={{
            base: 4,
            md: 0,
          }}
        >
          <ButtonGroup
            // as={Stack}
            // spacing={8}
            // align='center'
            flexDirection={{
              base: 'column',
              lg: 'initial',
            }}
            margin="auto"
            justifyContent={{
              base: 'center',
              sm: 'flex-start',
            }}
          >
            <Link passHref href={documentation}>
              <Button as="a" variant="solid" textDecoration="none" leftIcon={<FileText />} my={2}>
                Documentation
              </Button>
            </Link>
            <Link passHref href={source}>
              <Button as="a" variant="solid" textDecoration="none" leftIcon={<Code />} my={2}>
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
