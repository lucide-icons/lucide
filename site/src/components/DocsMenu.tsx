import {Box, BoxProps, Link, Text} from '@chakra-ui/react';
import docsMenuTree from '../lib/docsMenuTree';
import NextLink from 'next/link';
import {useRouter} from 'next/router';

const DocsMenu = (props: BoxProps) => {
  const router = useRouter();
  const linkIsActive = (currentPath, href) => currentPath.replace(/#.+$/, '') === (href ? `/docs/${href}` : '/docs');
  return (
    <Box {...props}>
      <Box paddingY={4}>
        {docsMenuTree.map(({section, items}) => (
          <Box key={section}>
            <Text fontSize={19} fontWeight="bold" marginBottom={2}>
              {section}
            </Text>
            <Box as="ul" style={{listStyle: 'none'}} marginBottom={6}>
              {items.map(({href, title}) => (
                <Box as="li" key={title}>
                  <Link
                    as={NextLink}
                    href={`/docs/${href}`}
                    _hover={{opacity: linkIsActive(router.asPath, href) ? 1 : 0.8}}
                    display="block"
                    color={linkIsActive(router.asPath, href) ? 'brand.500' : 'inherit'}
                  >
                    <Text
                      fontSize={16}
                      lineHeight={1.8}
                      opacity={linkIsActive(router.asPath, href) ? 1 : 0.5}
                      as="p"
                      width="100%"
                      display="block"
                    >
                      {title}
                    </Text>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DocsMenu;
