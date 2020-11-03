import { Box, Stack, Text } from "@chakra-ui/core";
import { useMemo } from "react"
import categories from '../../../categories.json'
import IconList from "./IconList";

const IconCategory = ({icons, data}) => {

  const iconLibrary = data.reduce((library, icon) => {
    library[icon.name] = icon;

    return library;
  }, {})


  const iconCategories = useMemo(() => Object.keys(categories).reduce((categoryMap, category) => {
    const categoryIcons = categories[category].map(icon => iconLibrary[icon]);
    const isSearching = icons.length !== data.length;
    const searchResults = isSearching ? categoryIcons.filter(icon => icons.find(({item})=> item.name === icon.name)) : categoryIcons;

    categoryMap.push({
      name: category,
      icons: searchResults
    })

    return categoryMap;
  },[]), [icons]);

  const toTitleCase = string => string.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

  return (
    <Stack spacing={8}>
      {
        iconCategories.filter(({icons}) => icons.length).map(({name, icons}) => (
          <Box key={name}>
            <Text fontSize="xl" marginBottom={3}>{toTitleCase(name)}</Text>
            <IconList icons={icons}/>
          </Box>
        ))
      }
    </Stack>
  )
}

export default IconCategory;
