import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Grid, Heading } from '@chakra-ui/react';
import IconCategory from '../../components/IconCategory';
import CategoryChangesBar from '../../components/CategoryChangesBar';
import { useState, useRef, RefAttributes } from 'react';
import IconReorder from '../../components/IconReorder';
import UnCategorizedIcons from '../../components/UnCategorizedIcons';
import { getAllCategories } from 'src/lib/categories';
import { Category, IconEntity } from 'src/types';

interface EditCategoriesPageProps {
  icons: IconEntity[]
  categories: Category[]
}


const EditCategoriesPage = ({ icons = [], categories: categoryList }: EditCategoriesPageProps) => {
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState<Record<string, IconEntity[]>>(
    categoryList.reduce((categoryMap, { name }) => {
      const categoryIcons = icons.filter(({categories}) => categories.includes(name))

      categoryMap[name] = categoryIcons

      return categoryMap;
    }, {}),
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
  const icons = await getAllData({ withChildKeys: true });
  const categories = await getAllCategories()

  return { props: { icons, categories } };
}
