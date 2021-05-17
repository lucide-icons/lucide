import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import theme from "../lib/theme";

const IconCategory = ({ name, isActive = false, children, ...rest }) => {
  const activeBackground = useColorModeValue(theme.colors.gray, theme.colors.gray[700]);
  const toTitleCase = string => string.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

  return (
    <Box
      key={name}
      category={name}
      backgroundColor={isActive ? activeBackground : 'transparent'}
      borderRadius={8}
      {...rest}
    >
      <Box>
        <Text
          fontSize="xl"
          marginBottom={3}
        >
          { toTitleCase(name) }
        </Text>
        {children}
      </Box>
    </Box>
  )
}

export default IconCategory;
