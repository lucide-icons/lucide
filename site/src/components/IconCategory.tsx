import { Box, Text, useColorModeValue, BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import theme from '../lib/theme';

interface IconCategoryProps extends BoxProps {
  active?: boolean;
  name: string;
}

const IconCategory = forwardRef<HTMLDivElement, IconCategoryProps>(
  ({ name, active = false, children, ...props }: IconCategoryProps, ref) => {
    const activeBackground = useColorModeValue(theme.colors.gray, theme.colors.gray[700]);
    const toTitleCase = string =>
      string
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ');

    return (
      <Box
        backgroundColor={active ? activeBackground : 'transparent'}
        borderRadius={8}
        ref={ref}
        {...props}
      >
        <Box>
          <Text fontSize="xl" marginBottom={3}>
            {toTitleCase(name)}
          </Text>
          {children}
        </Box>
      </Box>
    );
  },
);

export default IconCategory;
