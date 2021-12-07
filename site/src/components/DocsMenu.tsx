import { Box, Text } from '@chakra-ui/react';
import { useHeadingNavigationContext } from './HeadingNavigationProvider';

const DocsMenu = () => {
  const { headings } = useHeadingNavigationContext();

  return (
    <Box paddingX={4}>
      <Text fontSize={19} fontWeight='bold'>
        Section Title
      </Text>
    </Box>
  );
};

export default DocsMenu;
