import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import IconCategory from '../../components/IconCategory';
import CategoryChangesBar from '../../components/CategoryChangesBar';
import theme from '../../lib/theme';
import categoriesFile from '../../../../categories.json';
import { useState, useRef, RefAttributes, useEffect, useCallback, useMemo } from 'react';
import IconReorder from '../../components/IconReorder';
import UnCategorizedIcons from '../../components/UnCategorizedIcons';

const EditCategoriesPage = ({ icons = {} }) => {
  const [dragging, setDragging] = useState(false);
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
    console.log(category, newIcons);

    setCategories(currentCategories => {
      const newCategories = {
        ...currentCategories,
        [category]: newIcons.map(iconName => icons[iconName]),
      };

      if (JSON.stringify(currentCategories) !== JSON.stringify(newCategories)) {
        setChanges(changes => changes + 1);
      }

      return newCategories;
    });
  };

  return (
    <Layout maxWidth="1600px">
      <CategoryChangesBar categories={categories} changes={changes} />
      <Grid templateColumns="1fr 1fr" gridColumnGap={6}>
        <Box>
          <Heading as="h4" size="md" paddingTop={4}>
            All Icons
          </Heading>
          <UnCategorizedIcons
            icons={icons}
            dropZones={dropZones}
            dragging={dragging}
            setDragging={setDragging}
            categories={categories}
            handleChange={handleChange}
          />
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
                dragging={dragging}
                ref={el =>
                  (dropZones.current[index] = [category, el]) as RefAttributes<HTMLDivElement>
                }
              >
                <IconReorder
                  key={`${category}-reorder`}
                  icons={icons}
                  setIcons={handleChange(category)}
                  dropZones={dropZones}
                  // onDrop={onItemDrop}
                  dragging={dragging}
                  setDragging={setDragging}
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
