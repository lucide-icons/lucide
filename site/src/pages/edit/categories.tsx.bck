import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/core';
import IconCategory from '../../components/IconCategory';
import IconList from '../../components/IconList';
import CategoryChangesBar from '../../components/CategoryChangesBar';
import theme from '../../lib/theme';
import categoriesFile from '../../../../categories.json'
import { useEffect, useState, useMemo, useCallback } from 'react';

const EditCategoriesPage = ({ data }) => {
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);
  const activeBackground = useColorModeValue(theme.colors.gray, theme.colors.gray[400]);
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState(categoriesFile);
  const [changes, setChanges] = useState(0);
  const [hoveringCategory, setHoveringCategory] = useState('');
  const [draggingItem, setDraggingItem] = useState('');

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const category = event.target.getAttribute('category');

    if (category) {
      const icon = event.dataTransfer.getData("text/plain");

      setTimeout(() => {
        const newCategories = { ...categories };

        if(!newCategories[category].includes(icon)) {
          newCategories[category].push(icon)

          setChanges(changes + 1)
        }

        setCategories(newCategories);
      }, 400);
    }
  }, [categories, setCategories, changes, setChanges])

  const onDragEnter = (event) => {
    // event.preventDefault()
    // console.log(event.target);

    const category = event.target.getAttribute('category');

    if (category) {
      setHoveringCategory(category)
    }
  };

  const onDragStart = useCallback((event) => {
    const iconName = event.target.getAttribute('icon')

    if(iconName) {
      event.dataTransfer.setData("text/plain", iconName);
      setDragging(true)
    }
  }, [setDragging])

  const onDragEnd = useCallback((event) => {
    setDragging(false)
    setHoveringCategory('')
  }, [setDragging, setHoveringCategory])

  const iconListItemProps = {
    draggable: true,
    href: '',
    as: '',
    onDragStart,
    onDragEnd,
  }

  useEffect(() => {
    document.addEventListener("dragover", event => { event.preventDefault() }, false);
  }, [])

  const categoryProps = {
    cursor: dragging ? 'copy' : 'auto',
    _hover: {
      backgroundColor: dragging ? activeBackground : 'transparent',
    },
    innerProps: {
      pointerEvents: dragging ? 'none' : 'auto'
    },
    padding: 4,
    activeCategory: hoveringCategory,
    onDrop,
    onDragEnter,
  };

  return (
    <Layout maxWidth="1600px">
      <CategoryChangesBar {...{categories, changes}}/>
      <Grid templateColumns="1fr 1fr" gridColumnGap={6}>
        <Box>
          <Box position="sticky" top={6} paddingTop={4}>
            <Heading as="h4" size="md">
              All Icons
            </Heading>
            <Box
              marginTop={5}
              marginBottom={320}
              maxWidth="calc(1600px / 2)"
              width="100%"
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
          <Heading as="h4" size="md" paddingTop={4} paddingLeft={4}>
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
