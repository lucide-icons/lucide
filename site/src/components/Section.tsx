import {Box, BoxProps, useStyleConfig} from '@chakra-ui/react';
import {ReactNode} from 'react';

interface SectionProps extends BoxProps {
  variant: 'even'|'odd';
  children?: ReactNode;
}

const Section = ({variant, children, ...rest}: SectionProps): JSX.Element => {
  const styles = useStyleConfig('Section', {variant})
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Section;
