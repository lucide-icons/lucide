import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import IconCategory from '../../components/IconCategory';
import CategoryChangesBar from '../../components/CategoryChangesBar';
import theme from '../../lib/theme';
import categoriesFile from '../../../../categories.json';
import { useState, useRef, RefAttributes } from 'react';
import IconReorder from '../../components/IconReorder';

const EditCategoriesPage = ({ icons = {} }) => {
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);
  const activeBackground = useColorModeValue(theme.colors.gray, theme.colors.gray[400]);
  const [categories, setCategories] = useState(
    Object.fromEntries(
      Object.entries(categoriesFile).map(([category, iconNames]) => [
        category,
        iconNames.map(iconName => icons[iconName]),
      ]),
    ),
  );
  const [changes, setChanges] = useState(0);
  const dropZones = useRef<[string, HTMLDivElement][]>([]);

  const handleChange = (category: string) => (newIcons: string[]) => {
    // console.log('newItems', newItems);

    setCategories(currentCategories => ({
      ...currentCategories,
      [category]: newIcons.map(iconName => icons[iconName]),
    }));
  };

  // const handleEnter = (targetCategoryIndex: number | string) => (dragItem: DragObject) => {
  // const sourceCategoryIndex = categories.findIndex(category =>
  //   category.items.some(item => item.id === dragItem.id),
  // );
  // const sourceCategory = categories[sourceCategoryIndex];
  // const targetCategory = categories[targetCategoryIndex];
  // // console.log(sourceCategoryIndex);
  // if (sourceCategoryIndex === -1 && icons[dragItem.id]) {
  //   const items = [icons[dragItem.id]].map(item => ({ ...item, categoryId: targetCategory.id }));
  //   return setCategories(
  //     update(categories, {
  //       [targetCategoryIndex]: {
  //         items: { $set: add(targetCategory.items, items) },
  //       },
  //     }),
  //   );
  // }
  // if (targetCategory.items.some(item => item.id === dragItem.id)) {
  //   return;
  // }
  // const sourceItemIndex = sourceCategory.items.findIndex(item => item.id === dragItem.id);
  // const sourceItem = sourceCategory.items[sourceItemIndex];
  // const sourceDescendants = findDescendants(sourceCategory.items, sourceItemIndex);
  // const items = [sourceItem, ...sourceDescendants].map(item => ({
  //   ...item,
  //   categoryId: targetCategory.id,
  // }));
  // setCategories(
  //   update(categories, {
  //     [sourceCategoryIndex]: {
  //       items: { $set: remove(sourceCategory.items, sourceItemIndex) },
  //     },
  //     [targetCategoryIndex]: {
  //       items: { $set: add(targetCategory.items, items) },
  //     },
  //   }),
  // );
  // };

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
    // activeCategory: hoveringCategory,
    // onDrop,
    // onDragEnter,
  };

  return (
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
              // overflowY="auto"
              overflowX="visible"
            >
              <IconReorder
                icons={Object.values(icons)}
                setIcons={console.log}
                dropZones={dropZones}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Heading as="h4" size="md" paddingTop={4} paddingLeft={4}>
            Categories
          </Heading>
          <Box marginTop={5} marginBottom={320} marginLeft="auto">
            {Object.entries(categories).map(([category, icons], index) => (
              <IconCategory
                name={category}
                key={category}
                ref={el =>
                  (dropZones.current[index] = [category, el]) as RefAttributes<HTMLDivElement>
                }
              >
                <IconReorder
                  icons={icons}
                  setIcons={handleChange(category)}
                  dropZones={dropZones}
                />
              </IconCategory>
            ))}
          </Box>
        </Box>
      </Grid>
    </Layout>
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
