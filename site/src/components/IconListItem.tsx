import { Box, Button, ButtonProps, Flex, Text, useToast } from '@chakra-ui/react';
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
      padding={2}
      height={20}
      width={20}
      position="relative"
      whiteSpace="normal"
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
      <Flex direction="column" align="center" justify="stretch" width="100%">
        <Flex flex={2} flexBasis="100%" align="flex-end">
          <IconWrapper
            content={content}
            stroke={color}
            strokeWidth={strokeWidth}
            height={size}
            width={size}
          />
        </Flex>
        {/* <Flex flex={1} minHeight={10} align="center">
          <Text wordBreak="break-word" maxWidth="100%">
            {name}
          </Text>
        </Flex> */}
      </Flex>
    </Button>
  );
};

export default memo(IconListItem);
