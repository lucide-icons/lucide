import {Badge, Button, ButtonProps, chakra, Flex, Tooltip, useToast} from '@chakra-ui/react';
import download from 'downloadjs';
import {memo} from 'react';
import {IconWrapper} from './IconWrapper';

interface IconListItemProps extends ButtonProps {
  deprecated: boolean,
  name: string;
  onClick?: ButtonProps['onClick']
  src: string;
  active: boolean;
  hideVersionBadge?: boolean;
}

const IconListItem = ({name, onClick, active, createdRelease, hideVersionBadge, currentVersion, src: svg}: IconListItemProps) => {
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
      <chakra.div position="relative"
                  className={'icon-list-item-wrapper'}>
        <Button variant="iconListItem"
                active={active ? 'active' : undefined}
                className={'icon-list-item'}
                onClick={handleClick}
                key={name}
        >
          <Flex direction="column" align="center" justify="center" width="100%">
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
        </Button>
        <Badge variant="version" className="version-badge"
               opacity={hideVersionBadge ? 0 : (currentVersion === createdRelease.name ? 1 : 0)}>{createdRelease.name}</Badge>
      </chakra.div>
    </Tooltip>
  );
};

export default memo(IconListItem);
