import {Badge, Button, ButtonProps, chakra, Tooltip, useToast} from '@chakra-ui/react';
import download from 'downloadjs';
import {memo, useCallback} from 'react';
import {createLucideIcon} from 'lucide-react';
import {useCustomizeIconContext} from './CustomizeIconContext';
import {useRouter} from 'next/router';
import {IconEntity} from "../types";
import {
  useIconDetailOverlaySetContext
} from "./IconDetailOverlayContext";

interface IconListItemProps extends ButtonProps {
  icon: IconEntity;
  click?: (icon: IconEntity) => void;
}

const IconListItemIcon = ({icon}) => {
  const {name, iconNode} = icon;
  const Icon = createLucideIcon(name, iconNode)
  const {color, size, strokeWidth, iconsRef} = useCustomizeIconContext();
  return (
    <Icon
      ref={iconEl => (iconsRef.current[name] = iconEl)}
      size={size}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );
};

interface IconListItemButtonProps extends ButtonProps {
  icon: IconEntity;
}

const IconListItemButton = ({icon, children}: IconListItemButtonProps) => {
  const router = useRouter()
  const toast = useToast();
  const {name} = icon;
  const copyIconName = async (event) => {
    event.stopPropagation();
    await navigator.clipboard.writeText(name)

    toast({
      title: 'Copied!',
      description: `Icon name "${name}" copied to clipboard.`,
      status: 'success',
      duration: 1500,
    });
  }
  const {iconsRef} = useCustomizeIconContext();
  const {onOpen, setIcon} = useIconDetailOverlaySetContext();
  const handleClick = useCallback(async (event) => {
    const src = (iconsRef.current[name].outerHTML).replace(/(\r\n|\n|\r|(>\s\s<))/gm, "")

    if (event.shiftKey) {
      await navigator.clipboard.writeText(src)

      toast({
        title: 'Copied!',
        description: `Icon "${name}" copied to clipboard.`,
        status: 'success',
        duration: 1500,
      });
      return
    }
    if (event.ctrlKey) {
      copyIconName(event);
      return;
    }
    if (event.altKey) {
      download(src, `${name}.svg`, 'image/svg+xml');
      return
    }

    setIcon(icon);
    onOpen();
  }, [iconsRef, name, router, toast, onOpen, setIcon]);
  return (
    <Button
      as="a"
      variant="iconListItem"
      rounded="lg"
      padding={2}
      height={20}
      width={20}
      position="relative"
      whiteSpace="normal"
      alignItems="center"
      sx={{cursor: 'pointer'}}
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          handleClick(e)
        }
      }}
    >
      {children}
    </Button>
  );
}

const IconListItem = ({icon}: IconListItemProps) => {
  return (
    <Tooltip label={icon.name} hasArrow>
      <chakra.div position="relative"
                  className={'icon-list-item-wrapper'}>
        <IconListItemButton icon={icon}>
          <IconListItemIcon icon={icon} />
        </IconListItemButton>
      </chakra.div>
    </Tooltip>
  );
};

export default memo(IconListItem);
