import {Button, ButtonProps, Flex, Tooltip, useToast} from '@chakra-ui/react';
import download from 'downloadjs';
import {memo} from 'react';
import {IconWrapper} from './IconWrapper';
import {useCustomizeIconContext} from "./CustomizeIconContext";

interface IconListItemProps extends ButtonProps {
  name: string;
  onClick?: ButtonProps['onClick']
  src: string;
}

const IconListItem = ({name, onClick, src: svg}: IconListItemProps) => {
  const toast = useToast();

  const handleClick: ButtonProps['onClick'] = async (event) => {
    const src = svg;
    if (event.shiftKey) {
      await navigator.clipboard.writeText(src)

      toast({
        title: 'Copied!',
        description: `Icon "${name}" copied to clipboard.`,
        status: 'success',
        duration: 1500,
      });
      return;
    }
    if (event.altKey) {
      download(src, `${name}.svg`, 'image/svg+xml');
      return;
    }
    if (event.ctrlKey) {
      copyIconName(event);
      return;
    }
    if (onClick) {
      onClick(event);
    }
  }

  const copyIconName: ButtonProps['onClick'] = async (event) => {
    event.stopPropagation();
    await navigator.clipboard.writeText(name)

    toast({
      title: 'Copied!',
      description: `Icon name "${name}" copied to clipboard.`,
      status: 'success',
      duration: 1500,
    });
  }

  return (
    <Tooltip hasArrow label={name} aria-label={name}>
      <Button variant="iconListItem"
              className={'icon-list-item'}
              onClick={handleClick}
              key={name}
      >
        <Flex direction="column" align="center" justify="stretch" width="100%" gap={4}>
          <Flex flex={2} flexBasis="100%" align="flex-end">
            <IconWrapper
              src={svg}
              style={{
                stroke: "var(--lucide-stroke-color, currentColor)",
                strokeWidth: "var(--lucide-stroke-width, 2px)",
                height: "var(--lucide-icon-size, 24px)",
                width: "var(--lucide-icon-size, 24px)",
              }}
            />
          </Flex>
        </Flex>
      </Button>
    </Tooltip>
  );
};

export default memo(IconListItem);
