import { Button, ButtonProps, Tooltip, useToast } from '@chakra-ui/react';
import download from 'downloadjs';
import { memo } from 'react';
import { createLucideIcon, IconNode } from 'lucide-react';
import { useCustomizeIconContext } from './CustomizeIconContext';

interface IconListItemProps extends ButtonProps {
  name: string;
  onClick?: ButtonProps['onClick']
  iconNode: IconNode;
}

const IconListItem = ({ name, onClick, iconNode }: IconListItemProps) => {
  const toast = useToast();
  const { color, size, strokeWidth, iconsRef } = useCustomizeIconContext();

  const Icon = createLucideIcon(name, iconNode)

  const handleClick:ButtonProps['onClick'] = async (event) => {
    const src = (iconsRef.current[name].outerHTML).replace(/(\r\n|\n|\r|(>\s\s<))/gm, "")

    if (event.shiftKey) {
      await navigator.clipboard.writeText(src)

      toast({
        title: 'Copied!',
        description: `Icon "${name}" copied to clipboard.`,
        status: 'success',
        duration: 1500,
      });
    }
    if (event.altKey) {
      download(src, `${name}.svg`, 'image/svg+xml');
    }
    if (onClick) {
      onClick(event);
    }
  }


  return (
    <Tooltip label={name}>
      <Button
        variant="ghost"
        borderWidth="1px"
        rounded="lg"
        padding={2}
        height={20}
        width={20}
        position="relative"
        whiteSpace="normal"
        onClick={handleClick}
        key={name}
        alignItems="center"
      >
        <Icon
          ref={iconEl => (iconsRef.current[name] = iconEl)}
          size={size}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </Button>
    </Tooltip>
  );
};

export default memo(IconListItem);
