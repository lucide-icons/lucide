import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Flex, Grid, Heading, useColorModeValue } from '@chakra-ui/core';
import IconCategory from '../../components/IconCategory';
import IconList from '../../components/IconList';
import theme from '../../lib/theme';
import { useRouter } from 'next/router';

const EditCategoriesPage = ({ data }) => {
  const router = useRouter()
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);

  const onCategorieDrop = (event, categorie) => {
    console.log(event);
  }

  const ondragstart = (event) => {
    console.log(event);

    event.dataTransfer.setData("text/plain", 'anme');
  }

  const iconListItemProps = {
    draggable: true,
    href: '',
    as: '',
    ondragstart,
  }

  return (
    <Layout maxWidth="1600px">
      <Grid templateColumns="1fr 1fr" gridColumnGap={3}>
        <Box>
          <Box position="sticky" top={6} paddingTop={4}>
            <Heading as="h4" size="md">
              All Icons
            </Heading>
            <Box
              marginTop={5}
              marginBottom={320}
              maxWidth="100%"
              width="calc((1600px / 2) - 64px)"
              height="calc(100vh - 164px)"
              borderWidth="1px"
              boxSizing="border-box"
              rounded="lg"
              boxShadow={theme.shadows.xl}
              bg={boxBackground}
              padding={8}
              overflowY="scroll"
            >
              <IconList icons={data} iconListItemProps={iconListItemProps} enableClick={false} />
            </Box>
          </Box>
        </Box>
        <Box>
          <Heading as="h4" size="md" paddingTop={4}>
            Categories
          </Heading>
          <Box marginTop={5} marginBottom={320} marginLeft="auto">
            <IconCategory icons={data} data={data} onCategorieDrop={onCategorieDrop} />
          </Box>
        </Box>
      </Grid>
    </Layout>
  );
};

export default EditCategoriesPage;

export function getStaticProps() {
  const data = getAllData();
  return { props: { data } };
}
