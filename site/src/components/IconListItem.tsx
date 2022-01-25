import { Button, ButtonProps, Flex, Text, useToast } from '@chakra-ui/react';
import download from 'downloadjs';
import copy from 'copy-to-clipboard';
import { memo, useContext } from 'react';
import { IconStyleContext } from './CustomizeIconContext';
import { IconWrapper } from './IconWrapper';

interface IconListItemProps {
  name: string;
  content: string;
  contributors: any[];
  src: string;
  onClick?: ButtonProps['onClick'];
}

const IconListItem = ({ name, content, src, onClick }: IconListItemProps) => {
  const toast = useToast();
  const { color, size, strokeWidth } = useContext(IconStyleContext);

  return (
    <Button
      variant="ghost"
      borderWidth="1px"
      rounded="lg"
      padding={16}
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
};

export default memo(IconListItem);
