import { Box, BoxProps, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Category, IconEntity } from 'src/types';
import theme from '../lib/theme';
import IconList from './IconList';

interface IconCategoryProps {
  icons: IconEntity[]
  data: IconEntity[]
  categories: Category[]
  categoryProps?: {
    innerProps: BoxProps,
    activeCategory: string | null
  }
}

const IconCategory = ({
  icons,
  data,
  categories = [],
  categoryProps = {
    innerProps: {},
    activeCategory: null,
  },
}: IconCategoryProps) => {
  const { innerProps, activeCategory, ...outerProps } = categoryProps;
  const activeBackground = useColorModeValue(theme.colors.gray, theme.colors.gray[700]);

  const iconCategories = useMemo(
    () =>
      categories.reduce((categoryMap, { name, title }) => {
        const categoryIcons = data.filter(({categories}) => categories.includes(name))

        const isSearching = icons.length !== data.length;
        const searchResults = isSearching
          ? categoryIcons.filter(icon => icons.some((item) => item?.name === icon?.name))
          : categoryIcons;

        categoryMap.push({
          title,
          name,
          icons: searchResults,
          isActive: name === activeCategory,
        });

        return categoryMap;
      }, []),
    [icons, categories, activeCategory],
  );

  return (
    <Stack spacing={4}>
      {iconCategories
        .filter(({ icons }) => icons.length)
        .map(({ name, title, icons, isActive }) => (
          <Box
            key={name}
            backgroundColor={isActive ? activeBackground : 'transparent'}
            borderRadius={8}
            {...outerProps}
          >
            <Box {...innerProps || {}}>
              <Text fontSize="xl" marginBottom={3} id={name} sx={{
                '&:target': {
                  scrollMarginTop: 20
                }
              }}>
                {title}
              </Text>
              <IconList icons={icons} category={name}/>
            </Box>
          </Box>
        ))}
    </Stack>
  );
};

export default IconCategory;
