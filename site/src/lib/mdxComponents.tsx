import {
  Text,
  UnorderedList,
  ListItem,
  Image,
  Divider,
  OrderedList,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  Code as InlineCode,
  Link
} from '@chakra-ui/react';
import CodeBlock from '../components/CodeBlock';
import NextLink from "next/link"
import HeadingAnchored from '../components/HeadingAnchored';


const components = {
  h1: (props) => (
    <HeadingAnchored as="h1"  size="xl" mb={4} {...props}/>
  ),
  h2: ({children, ...rest}) => (
    <HeadingAnchored as="h2" size="lg" py={4} { ...rest}>
      {children}
      <Divider mt={4}/>
    </HeadingAnchored>
  ),
  h3: (props) => (
    <HeadingAnchored as="h3" size="md" pt={4} mb={4} {...props}/>
  ),
  h4: (props) => (
    <HeadingAnchored as="h4" size="sm" pt={4} mb={4} {...props}/>
  ),
  h5: (props) => (
    <HeadingAnchored as="h5" size="xs" pt={2} mb={1} {...props}/>
  ),
  h6: (props) => (
    <HeadingAnchored as="h6" size="xs" pt={2} mb={1} opacity={.75} {...props}/>
  ),
  ul: (props) => <UnorderedList my={2}>{props.children}</UnorderedList>,
  ol: (props) => <OrderedList my={2}>{props.children}</OrderedList>,
  li: (props) => <ListItem my={1}>{props.children}</ListItem>,
  p: (props) => <Text my={4}>{props.children}</Text>,
  img: ({ children, ...rest }) => <Image {...rest} borderRadius={4} my={2}>{children}</Image>,
  code: ({ className, children: code }) => {
    const language = className.replace('language-', '');

    return (
      <CodeBlock
        marginY={6}
        code={code}
        language={language}
      />
    )
  },
  table: (props) => <Table {...props} rounded={4} mb={4}/>,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  blockquote: (props) => (
    <Alert
      mt="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded={4}
      my="1.5rem"
      {...props}
    />
  ),
  inlineCode: InlineCode,
  hr: () => <Divider my={4} />,
  a: ({children, href, ...rest}) => {
    let link = href
    const isExternal = link.startsWith('http')

    if(link.startsWith('packages/')) {
      link = href.replace('packages/', '')
    }

    link = link.replace('.md', '')

    return (
      <NextLink
        href={isExternal ? href : `/docs/${link}`}
        {...rest}
        passHref
      >
        <Link isExternal={isExternal} color='#F56565'>{children}</Link>
      </NextLink>
    )
  }
};

export default components;
