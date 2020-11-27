import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/core";
import { useMemo } from "react"
import theme from "../lib/theme";
import IconList from "./IconList";

const IconCategory = ({
  icons,
  data,
  categories,
  categoryProps = {
    innerProps: {},
    activeCategory: null
  }
}) => {
  const iconLibrary = data.reduce((library, icon) => {
    library[icon.name] = icon;

    return library;
  }, {})

  const { innerProps, activeCategory, ...outerProps } = categoryProps;
  const activeBackground = useColorModeValue(theme.colors.gray, theme.colors.gray[700]);

  const iconCategories = useMemo(() => Object.keys(categories).reduce((categoryMap, category) => {
    const categoryIcons = categories[category].map(icon => iconLibrary[icon]);
    const isSearching = icons.length !== data.length;
    const searchResults = isSearching ? categoryIcons.filter(icon => icons.find(({item})=> item.name === icon.name)) : categoryIcons;

    categoryMap.push({
      name: category,
      icons: searchResults,
      isActive: category === activeCategory,
    })

    return categoryMap;
  }, []), [icons, categories, activeCategory]);

  const toTitleCase = string => string.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

  return (
    <Stack spacing={4}>
      {
        iconCategories.filter(({icons}) => icons.length).map(({name, icons, isActive}) => (
          <Box
            key={name}
            category={name}
            backgroundColor={isActive ? activeBackground : 'transparent'}
            borderRadius={8}
            {...outerProps}
          >
            <Box {...(innerProps || {})}>
              <Text fontSize="xl" marginBottom={3}>{toTitleCase(name)}</Text>
              <IconList icons={icons} />
            </Box>
          </Box>
        ))
      }
    </Stack>
  )
}

export default IconCategory;
