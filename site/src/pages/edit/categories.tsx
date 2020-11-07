import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Flex, Grid, Heading, useColorModeValue } from '@chakra-ui/core';
import IconCategory from '../../components/IconCategory';
import IconList from '../../components/IconList';
import theme from '../../lib/theme';
import { useRouter } from 'next/router';
import categoriesFile from '../../../../categories.json'
import { useEffect, useState, useMemo } from 'react';

const EditCategoriesPage = ({ data }) => {
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState(categoriesFile);

  const onDrop = (event) => {
    // event.preventDefault();
    // console.log('onDrop', event.target);
    const category = event.target.getAttribute('category');
    if (category) {
      const icon = event.dataTransfer.getData("text/plain");

      setTimeout(() => {
        const newCategories = { ...categories };

        if(!newCategories[category].includes(icon)) {
          newCategories[category].push(icon)
        }

        setCategories(newCategories);

        console.log(categories);

      }, 0);
    }


  }

  const onDragEnter = (event) => {
    const category = event.target.getAttribute('category');
    // console.log('onDrop',event);
    if (category) {
      // console.log(event.target);
    }

  }

  const onDragStart = (event) => {
    const iconName = event.target.getAttribute('icon')

    if(iconName) {
      event.dataTransfer.setData("text/plain", iconName);

      setTimeout(() => {
        setDragging(true)
      }, 0);
    }
  }

  const onDragEnd = (event) => {
    setTimeout(() => {
      setDragging(false)
    }, 0);
  }

  const iconListItemProps = {
    draggable: true,
    href: '',
    as: '',
    onDragStart,
    onDragEnd,
  }

  useEffect(() => {
    document.addEventListener('dragenter', onDragEnter , false);
    document.addEventListener("dragover", event => { event.preventDefault() }, false);


    return () => {
      document.removeEventListener('dragenter', onDragEnter)
    }
  }, [onDrop, onDragEnter])

  const categoryProps = useMemo(() => ({
    innerProps: {
      pointerEvents: dragging ? 'none' : 'auto'
    },
    onDrop
//     onMouseOver: (event) => {
// console.log('hoppa', event);

//     },

  }), [dragging])

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
              maxWidth="calc((1600px / 2) - 64px)"
              width="calc(100% - 32px)"
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
            <IconCategory
              icons={data}
              data={data}
              categories={categories}
              categoryProps={categoryProps}
            />
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
