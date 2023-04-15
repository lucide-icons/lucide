import {Flex, FlexProps, useStyleConfig} from '@chakra-ui/react';
import {ReactNode} from 'react';

interface SectionProps extends FlexProps {
  variant: 'even'|'odd'|'first';
  children?: ReactNode;
}

const Section = ({variant, children, ...rest}: SectionProps): JSX.Element => {
  const styles = useStyleConfig('Section', {variant})
  return (
    <Flex __css={styles} {...rest}>
      {children}
    </Flex>
  );
};

export default Section;
