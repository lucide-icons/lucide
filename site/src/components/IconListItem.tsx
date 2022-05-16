import { Button, ButtonProps, Flex, Text, useToast } from '@chakra-ui/react';
import download from 'downloadjs';
import copy from 'copy-to-clipboard';
import { memo } from 'react';
import { useCustomizeIconContext } from './CustomizeIconContext';
import { IconWrapper } from './IconWrapper';

interface IconListItemProps {
  name: string;
  content: string;
  contributors: any[];
  src: string;
  onClick?: ButtonProps['onClick'];
}

const IconListItem = ({ name, content, onClick, src: svg }: IconListItemProps) => {
  const toast = useToast();
  const { color, size, strokeWidth, iconsRef } = useCustomizeIconContext();

  return (
    <Button
      variant="ghost"
      borderWidth="1px"
      rounded="lg"
      padding={2}
      height={32}
      position="relative"
      whiteSpace="normal"
      onClick={event => {
        const src = iconsRef.current[name].outerHTML ?? svg
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
      <Flex direction="column" align="center" justify="stretch" width="100%" gap={4}>
        <Flex flex={2} flexBasis="100%" minHeight={10} align="flex-end">
          <IconWrapper
            content={content}
            stroke={color}
            strokeWidth={strokeWidth}
            height={size}
            width={size}
            ref={iconEl => (iconsRef.current[name] = iconEl)}
          />
        </Flex>
        <Flex flex={1} minHeight={10} align="center">
          <Text wordBreak="break-word" maxWidth="100%">
            {name}
          </Text>
        </Flex>
      </Flex>
    </Button>
  );
};

export default memo(IconListItem);
