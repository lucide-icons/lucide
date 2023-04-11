import {Badge, Button, ButtonProps, chakra, Tooltip, useToast} from '@chakra-ui/react';
import download from 'downloadjs';
import {memo, useCallback} from 'react';
import {createLucideIcon} from 'lucide-react';
import {useCustomizeIconContext} from './CustomizeIconContext';
import {useRouter} from 'next/router';
import {IconEntity} from "../types";

type IconListItemProps = ButtonProps & IconEntity;

const IconListItem = ({name, iconNode, createdRelease}: IconListItemProps) => {
  const router = useRouter()
  const toast = useToast();
  const {color, size, strokeWidth, iconsRef} = useCustomizeIconContext();

  const Icon = createLucideIcon(name, iconNode)

  const handleClick: ButtonProps['onClick'] = useCallback(async (event) => {
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

    router.push({
        pathname: `/icon/${name}`,
        query: (
          router.query?.search != null
            ? {search: router.query.search}
            : {}
        ),
      },
      undefined,
      {
        shallow: true,
        scroll: false
      })
  }, [iconsRef, name, router, toast])

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
    <Tooltip label={name} hasArrow>
      <chakra.div position="relative"
                  className={'icon-list-item-wrapper'}>
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
          onClick={handleClick}
        >
          <Icon
            ref={iconEl => (iconsRef.current[name] = iconEl)}
            size={size}
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </Button>
        {createdRelease
          ? (
            <Badge variant="version"
                   className="version-badge"
                   opacity={0}
            >{createdRelease.name}</Badge>
          )
          : null
        }
      </chakra.div>
    </Tooltip>
  );
};

export default memo(IconListItem);
