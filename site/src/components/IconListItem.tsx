import { Button, ButtonProps, Flex, useToast } from '@chakra-ui/react';
import download from 'downloadjs';
import copy from 'copy-to-clipboard';
import { memo, useContext } from 'react';
import { IconStyleContext } from './CustomizeIconContext';
import { IconWrapper } from './IconWrapper';

interface IconListItemProps extends ButtonProps {
  name: string;
  content: string;
  contributors: any[];
  src: string;
}

const IconListItem = ({ name, content, src, onClick, ...props }: IconListItemProps) => {
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
      alignItems="center"
      onClick={event => {
        if (onClick == null) {
          return;
        }
        if (event.shiftKey) {
          copy(src);
          toast({
            title: 'Copied!',
            description: `Icon "${name}" copied to clipboard.`,
            status: 'success',
            duration: 1500,
          });
          return;
        }
        if (event.altKey) {
          download(src, `${name}.\svg`, 'image/svg+xml');
          return;
        }
        if (onClick) {
          onClick(event);
          return;
        }
      }}
      {...props}
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
      </Flex>
    </Button>
  );
};

export default memo(IconListItem);
