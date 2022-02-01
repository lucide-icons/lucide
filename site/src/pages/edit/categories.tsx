import { ContextProvider, ItemData, DragObject, add, remove, findDescendants } from 'react-sortly';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import IconCategory from '../../components/IconCategory';
import IconList from '../../components/IconList';
import CategoryChangesBar from '../../components/CategoryChangesBar';
import theme from '../../lib/theme';
import categoriesFile from '../../../../categories.json';
import update from 'immutability-helper';
import { useEffect, useState, useMemo, useCallback } from 'react';
import SortableIconList from '../../components/SortableIconList';
import throttle from 'lodash/throttle';

const EditCategoriesPage = ({ icons = {} }) => {
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);
  const activeBackground = useColorModeValue(theme.colors.gray, theme.colors.gray[400]);
  const [categories, setCategories] = useState(
    Object.entries(categoriesFile).map(([category, iconNames], index) => {
      return {
        id: index,
        name: category,
        items: iconNames.map(iconName => {
          return {
            ...icons[iconName],
            id: `${category}.${iconName}`,
            depth: 0,
          };
        }),
      };
    }, {}),
  );
  const [changes, setChanges] = useState(0);
  const [hoveringCategory, setHoveringCategory] = useState('');

  const setCategoriesDebounced = throttle(setCategories, 500);

  const iconListItemProps = {
    draggable: true,
    href: '',
    as: '',
  };

  const handleChange = (index: number | string) => (newItems: ItemData<Item>[]) => {
    setCategories(
      update(categories, {
        [index]: { items: { $set: newItems } },
      }),
    );
  };

  const handleEnter = (targetCategoryIndex: number | string) => (dragItem: DragObject) => {
    const sourceCategoryIndex = categories.findIndex(category =>
      category.items.some(item => item.id === dragItem.id),
    );

    const sourceCategory = categories[sourceCategoryIndex];
    const targetCategory = categories[targetCategoryIndex];

    console.log(sourceCategoryIndex);

    if (sourceCategoryIndex === -1 && icons[dragItem.id]) {
      const items = [icons[dragItem.id]].map(item => ({ ...item, categoryId: targetCategory.id }));
      return setCategories(
        update(categories, {
          [targetCategoryIndex]: {
            items: { $set: add(targetCategory.items, items) },
          },
        }),
      );
    }

    if (targetCategory.items.some(item => item.id === dragItem.id)) {
      return;
    }

    const sourceItemIndex = sourceCategory.items.findIndex(item => item.id === dragItem.id);
    const sourceItem = sourceCategory.items[sourceItemIndex];
    const sourceDescendants = findDescendants(sourceCategory.items, sourceItemIndex);
    const items = [sourceItem, ...sourceDescendants].map(item => ({
      ...item,
      categoryId: targetCategory.id,
    }));

    setCategories(
      update(categories, {
        [sourceCategoryIndex]: {
          items: { $set: remove(sourceCategory.items, sourceItemIndex) },
        },
        [targetCategoryIndex]: {
          items: { $set: add(targetCategory.items, items) },
        },
      }),
    );
  };

  // useEffect(() => {
  //   const mappedCategories = Object.entries(categoriesFile).reduce((acc, [category, iconNames]) => {
  //     acc[category] = iconNames.map(iconName => {
  //       const icon = icons[iconName];
  //       icon.id = `${category}.${iconName}`
  //       return icon;
  //     })
  //     return acc;
  //   }, {})

  //   setCategories(mappedCategories);

  // },[categoriesFile, icons])

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
    <DndProvider backend={HTML5Backend}>
      <ContextProvider>
        <Layout maxWidth="1600px">
          <CategoryChangesBar {...{ categories, changes }} />
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
                  <SortableIconList
                    id={999}
                    items={Object.values(icons)}
                    onChange={handleEnter('iconList')}
                    onEnter={handleEnter('iconList')}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Heading as="h4" size="md" paddingTop={4} paddingLeft={4}>
                Categories
              </Heading>
              <Box marginTop={5} marginBottom={320} marginLeft="auto">
                {categories.map(({ id, name, items }, index) => (
                  <IconCategory name={name} key={name}>
                    <SortableIconList
                      id={index}
                      items={items}
                      onChange={handleChange(index)}
                      onEnter={handleEnter(index)}
                    />
                  </IconCategory>
                ))}
              </Box>
            </Box>
          </Grid>
        </Layout>
      </ContextProvider>
    </DndProvider>
  );
};

export default EditCategoriesPage;

export async function getStaticProps() {
  const fetchedIcons = await getAllData();
  const icons = fetchedIcons.reduce((acc, item) => {
    acc[item.name] = item;
    acc[item.name].id = item.name;
    return acc;
  }, {});
  return { props: { icons } };
}
