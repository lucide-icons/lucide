import { getAllData } from '../../lib/icons';
import Layout from '../../components/Layout';
import { Box, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import IconCategory from '../../components/IconCategory';
import CategoryChangesBar from '../../components/CategoryChangesBar';
import theme from '../../lib/theme';
import categoriesFile from '../../../../categories.json';
import { useState, useRef, RefAttributes, useEffect, useCallback, useMemo } from 'react';
import IconReorder from '../../components/IconReorder';

const EditCategoriesPage = ({ icons = {} }) => {
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);
  const allIconContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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
    setCategories(currentCategories => ({
      ...currentCategories,
      [category]: newIcons.map(iconName => icons[iconName]),
    }));

    setChanges(changes => changes + 1);
  };

  const onItemDrop = useCallback(
    (iconName: string, targetCategory: string) => {
      console.log(iconName, targetCategory);
      if (categories[targetCategory].some(item => item.name === iconName)) {
        return;
      }

      setCategories(currentCategories => {
        const newIcons = [...currentCategories[targetCategory], icons[iconName]];

        return {
          ...currentCategories,
          [targetCategory]: newIcons,
        };
      });
      setChanges(changes => changes + 1);
    },
    [categories],
  );

  const unCategorizedIcons = useMemo(
    () =>
      Object.values(icons).filter(icon => {
        return !Object.values(categories)
          .flat()
          .some(categorizedIcon => categorizedIcon.name === icon.name);
      }),
    [icons, categories],
  );

  useEffect(() => {
    allIconContainerRef.current.addEventListener('scroll', event => {
      setScrollPosition(allIconContainerRef.current.scrollTop);
    });
  }, []);

  return (
    <Layout maxWidth="1600px">
      <CategoryChangesBar categories={categories} changes={changes} />
      <Grid templateColumns="1fr 1fr" gridColumnGap={6}>
        <Box>
          <Heading as="h4" size="md" paddingTop={4}>
            All Icons
          </Heading>
          <Box paddingTop={0} position="sticky" top="0">
            <Box
              marginTop={5}
              marginBottom={320}
              maxWidth="calc(1600px / 2)"
              width="100%"
              height="calc(100vh)"
              borderWidth="1px"
              boxSizing="border-box"
              rounded="lg"
              boxShadow={theme.shadows.xl}
              bg={boxBackground}
              padding={8}
              overflowY={dragging ? 'visible' : 'auto'}
              ref={allIconContainerRef}
            >
              <Box marginTop={dragging ? scrollPosition * -1 : undefined}>
                <Heading as="h5" size="sm" marginBottom={4}>
                  Uncategorized Icons
                </Heading>
                <IconReorder
                  icons={unCategorizedIcons}
                  dropZones={dropZones}
                  onDrop={onItemDrop}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  setIcons={() => {}}
                  dragging={dragging}
                  setDragging={setDragging}
                />

                <Heading as="h5" size="sm" marginBottom={4}>
                  All Icons
                </Heading>
                <IconReorder
                  icons={Object.values(icons)}
                  dropZones={dropZones}
                  onDrop={onItemDrop}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  setIcons={() => {}}
                  dragging={dragging}
                  setDragging={setDragging}
                  sx={{
                    opacity: 0.4,
                  }}
                />
              </Box>
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
                  onDrop={onItemDrop}
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
