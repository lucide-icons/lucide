import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Flex, Heading, useColorModeValue  } from '@chakra-ui/core';
import IconCategory from '../../components/IconCategory';
import IconList from '../../components/IconList';
import theme from '../../lib/theme';

const EditCategoriesPage = ({ data }) => {
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);

  return (
    <Layout maxWidth="1600px">
      <Flex position="relative">
        <Box width="50%">
          <Heading as="h4" size="md">
            All Icons
          </Heading>
        </Box>
        <Box width="50%">
          <Heading as="h4" size="md">
          Categories
          </Heading>
        </Box>
      </Flex>
      <Flex position="relative">
        <Box
          marginTop={5}
          marginBottom={320}
          maxWidth="50%"
          width="calc((1600px / 2) - 64px)"
          height="calc(100vh - 164px)"
          borderWidth="1px"
          boxSizing="border-box"
          rounded="lg"
          boxShadow={theme.shadows.xl}
          position="fixed"
          right="inherit"
          bg={boxBackground}
          padding={8}
        >
          <IconList icons={data} />
        </Box>
        <Box marginTop={5} marginBottom={320} width="50%" marginLeft="auto">
          <IconCategory icons={data} data={data} />
        </Box>
      </Flex>
    </Layout>
  )
}

export default EditCategoriesPage

export function getStaticProps() {
  const data = getAllData();
  return { props: { data } }
}
