import { Flipper } from 'react-flip-toolkit';
import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import IconCategory from '../../components/IconCategory';
import IconList from '../../components/IconList';
import CategoryChangesBar from '../../components/CategoryChangesBar';
import theme from '../../lib/theme';
import categoriesFile from '../../../../categories.json'
import update from 'immutability-helper';
import { useEffect, useState, useMemo, useCallback } from 'react';
import SortableIconList from '../../components/SortableIconList';

const EditCategoriesPage = ({ data: icons }) => {
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);
  const activeBackground = useColorModeValue(theme.colors.gray, theme.colors.gray[400]);
  const [categories, setCategories] = useState(categoriesFile);
  const [changes, setChanges] = useState(0);
  const [hoveringCategory, setHoveringCategory] = useState('');

  const iconListItemProps = {
    draggable: true,
    href: '',
    as: '',
  }

  const handleChange = (index: number) => (newItems: ItemData<Item>[]) => {
    setCategories(update(categories, {
      [index]: { items: { $set: newItems } },
    }));
  };
  const handleEnter = (targetCategoryIndex: number) => (dragItem: DragObject) => {
    const sourceCategoryIndex = categories.findIndex((category) => (
      category.items.some((item) => item.id === dragItem.id)
    ));
    const sourceCategory = categories[sourceCategoryIndex];
    const targetCategory = categories[targetCategoryIndex];

    if (targetCategory.items.some((item) => item.id === dragItem.id)) {
      return;
    }

    const sourceItemIndex = sourceCategory.items.findIndex((item) => item.id === dragItem.id);
    const sourceItem = sourceCategory.items[sourceItemIndex];
    const sourceDescendants = findDescendants(sourceCategory.items, sourceItemIndex);
    const items = [sourceItem, ...sourceDescendants].map((item) => ({ ...item, categoryId: targetCategory.id }));

    setCategories(update(categories, {
      [sourceCategoryIndex]: {
        items: { $set: remove(sourceCategory.items, sourceItemIndex) },
      },
      [targetCategoryIndex]: {
        items: { $set: add(targetCategory.items, items) }
      },
    }));
  };

  const categoryProps = {
    // cursor: dragging ? 'copy' : 'auto',
    // _hover: {
    //   backgroundColor: dragging ? activeBackground : 'transparent',
    // },
    // innerProps: {
    //   pointerEvents: dragging ? 'none' : 'auto'
    // },
    padding: 4,
    activeCategory: hoveringCategory,
    // onDrop,
    // onDragEnter,
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
              <IconList icons={icons} iconListItemProps={iconListItemProps} enableClick={false} />
            </Box>
          </Box>
        </Box>
        <Box>
          <Heading as="h4" size="md" paddingTop={4} paddingLeft={4}>
            Categories
          </Heading>
          <Box marginTop={5} marginBottom={320} marginLeft="auto">
            <Flipper flipKey={Object.values(categories).map(( items ) => items.map((name) => name).join('.')).join('.')}>
              {
                Object.entries(categories).map(({ key: categoryName, values: iconNames }, index) => (
                  <IconCategory name={categoryName}>
                    <SortableIconList
                      id={index}
                      items={items}
                      onChange={handleChange(index)}
                      onEnter={handleEnter(index)}
                    />
                  </IconCategory>
                ))
              }
            </Flipper>
          </Box>
        </Box>
      </Grid>
    </Layout>
  );
};

export default EditCategoriesPage;

export async function getStaticProps() {
  const data = await getAllData();
  return { props: { data } };
}
