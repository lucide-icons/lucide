import { Text, Heading, UnorderedList, ListItem, Image, Divider, OrderedList } from '@chakra-ui/react';
import CodeBlock from '../components/CodeBlock';

const components = {
  h1: (props) => (
    <Heading as="h1"  size="xl" mb={4}>
      {props.children}
    </Heading>
  ),
  h2: (props) => (
    <Heading as="h2" size="lg" my={4}>
      {props.children}
      <Divider mt={4}/>
    </Heading>
  ),
  h3: (props) => (
    <Heading as="h3" size="md" mt={4} mb={2}>
      {props.children}
    </Heading>
  ),
  h4: (props) => (
    <Heading as="h4" size="sm" mt={4} mb={2}>
      {props.children}
    </Heading>
  ),
  h5: (props) => (
    <Heading as="h5" size="xs" mt={2} mb={1}>
      {props.children}
    </Heading>
  ),
  h6: (props) => (
    <Heading as="h6" size="xs" mt={2} mb={1} opacity={.75}>
      {props.children}
    </Heading>
  ),
  ul: (props) => <UnorderedList my={2}>{props.children}</UnorderedList>,
  ol: (props) => <OrderedList my={2}>{props.children}</OrderedList>,
  li: (props) => <ListItem my={1}>{props.children}</ListItem>,
  p: (props) => <Text my={2}>{props.children}</Text>,
  img: ({ children, ...rest }) => <Image {...rest} borderRadius={4} my={2}>{children}</Image>,
  code: ({ className, children: code }) => {
    const language = className.replace('language-', '');

    return (
      <CodeBlock
        code={code}
        language={language}
      />
    )
  }
};

export default components;
