import { Button, ButtonProps, Flex, Text, useToast } from '@chakra-ui/react';
import download from 'downloadjs';
import copy from 'copy-to-clipboard';
import { forwardRef, memo } from 'react';
import { useCustomizeIconContext } from './CustomizeIconContext';
import { IconWrapper } from './IconWrapper';

interface IconListItemProps {
  name: string;
  content: string;
  contributors: any[];
  src: string;
  onClick?: ButtonProps['onClick'];
}

const IconListItem = forwardRef(({ name, content, src, onClick }: IconListItemProps, ref) => {
  const toast = useToast();
  const { color, size, strokeWidth } = useCustomizeIconContext();

  return (
    <Button
      ref={ref}
      variant="ghost"
      borderWidth="1px"
      rounded="lg"
      paddingY={16}
      position="relative"
      onClick={event => {
        if (event.shiftKey) {
          copy(src);
          toast({
            title: 'Copied!',
            description: `Icon "${name}" copied to clipboard.`,
            status: 'success',
            duration: 1500,
          });
        }
        if (event.altKey) {
          download(src, `${name}.\svg`, 'image/svg+xml');
        }
        if (onClick) {
          onClick(event);
        }
      }}
      key={name}
      alignItems="center"
    >
      <Flex direction="column" align="center" justify="center">
        <IconWrapper
          content={content}
          stroke={color}
          strokeWidth={strokeWidth}
          height={size}
          width={size}
        />
        <Text marginTop={5}>{name}</Text>
      </Flex>
    </Button>
  );
});

export default memo(IconListItem);
