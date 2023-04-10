import {
  Avatar,
  AvatarGroup,
  Box,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Link,
  Slide,
  Wrap,
  Tag,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import theme from '../lib/theme';
import download from 'downloadjs';
import {
  Code as CodeIcon,
  Copy as CopyIcon,
  Download as DownloadIcon,
  Image as ImageIcon,
  X as Close
} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {useCustomizeIconContext} from "./CustomizeIconContext";
import {IconEntity} from '../types';
import ModifiedTooltip from './ModifiedTooltip';
import IconCodeExamples from './IconCodeExamples';
import { createLucideIcon } from 'lucide-react';

type IconDownload = {
  src: string;
  name: string;
};

interface IconDetailOverlayProps {
  open?: boolean
  close?: () => void
  icon?: IconEntity
}

const IconDetailOverlay = ({open = true, close, icon}: IconDetailOverlayProps) => {
  const toast = useToast();
  const {colorMode} = useColorMode();
  const { tags = [], name, iconNode } = icon ?? {};
  const {color, strokeWidth, size} = useCustomizeIconContext();
  const iconRef = useRef<SVGSVGElement>(null);
  const {isOpen, onOpen, onClose} = useDisclosure()

  useEffect(() => {
    if (open) {
      onOpen()
    }
  }, [open])

  if (icon == null) {
    return null
  }

  const handleClose = () => {
    onClose();
    close();
  };

  const iconStyling = {
    height: "25vw",
    width: "25vw",
    minHeight: "160px",
    minWidth: "160px",
    maxHeight: "240px",
    maxWidth: "240px",
    color: color,
  };

  const Icon = createLucideIcon(name, iconNode)

  const downloadIcon = ({name = ''} : IconDownload) => download(iconRef.current.outerHTML, `${name}.svg`, 'image/svg+xml');

  const copyIcon = async ({name} : IconDownload) => {
    const trimmedSrc = iconRef.current.outerHTML.replace(/(\r\n|\n|\r|\s\s)/gm, "")
    await navigator.clipboard.writeText(trimmedSrc)

    toast({
      title: "Copied!",
      description: `Icon "${name}" copied to clipboard.`,
      status: "success",
      duration: 1500,
      isClosable: true
    });
  }

  const copyName = async (name) => {
    await navigator.clipboard.writeText(name)

    toast({
      title: "Copied!",
      description: `Icon name "${name}" copied to clipboard.`,
      status: "success",
      duration: 1500,
      isClosable: true
    });
  }

  const downloadPNG = ({name}: IconDownload) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = `data:image/svg+xml;base64,${btoa(iconRef.current.outerHTML)}`;
    image.onload = function () {
      ctx.drawImage(image, 0, 0);

      const link = document.createElement('a');
      link.download = `${name}.png`;
      link.href = canvas.toDataURL('image/png')
      link.click();
    }
  }

  return (
    <Box
      position="fixed"
      bottom={0}
      zIndex={2}
      width="100%"
      left={0}
      height={0}
      key={name}
    >
      <Slide direction="bottom" in={isOpen} style={{zIndex: 10, pointerEvents: 'none'}}
             mx="auto"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW={theme.semanticTokens.sizes['container-max-width']}
          w="full"
          p={theme.sizes.containerSpacing}
          style={{ pointerEvents: 'initial' }}
          margin="auto"
        >
          <Box
            rounded="lg"
            border="none"
            width="full"
            boxShadow={theme.shadows['dark-lg']}
            position="relative"
            bg={
              colorMode == "light"
                ? theme.colors.white
                : theme.colors.black
            }
            padding={4}
          >
            <Flex
              direction={{base: 'column', md: 'row'}}
              style={{cursor: "pointer"}}
              w="100%"
              mb={2}
            >
              <Flex
                position="relative"
                direction="row"
                order={{base: 1, md: 0}}
                justify={{base: 'center', md: 'flex-start'}}
                mt={{base: 4, md: 0}}
              >
                <Tooltip hasArrow label="Copy icon name" aria-label='Copy icon name'>
                  <Flex
                    position="relative"
                    direction="row"
                    style={{cursor: "pointer"}}
                    pr={6}
                    onClick={() => copyName(icon.name)}
                    align="center"
                  >
                    <CopyIcon/>
                    <Text fontSize="3xl" fontFamily={theme.fonts.mono} ml={2}>
                      {icon.name}
                    </Text>
                    {icon?.contributors?.length ? (<ModifiedTooltip/>) : null}
                  </Flex>
                </Tooltip>
              </Flex>

              <ButtonGroup ml="auto"
                           order={{base: 0, md: 1}}
              >
                <Tooltip hasArrow label="Download SVG">
                  <IconButton
                    variant="ghost"
                    aria-label="Download SVG"
                    onClick={() => downloadIcon({
                      src: iconRef.current.outerHTML,
                      name: icon.name
                    })}
                    icon={<DownloadIcon/>}
                  />
                </Tooltip>
                <Tooltip hasArrow label="Copy SVG">
                  <IconButton
                    variant="ghost"
                    aria-label="Copy SVG"
                    onClick={() => copyIcon({
                      src: iconRef.current.outerHTML,
                      name: icon.name
                    })}
                    icon={<CodeIcon/>}
                  />
                </Tooltip>
                <Tooltip hasArrow label="Download PNG">
                  <IconButton
                    variant="ghost"
                    aria-label="Download PNG"
                    onClick={() => downloadPNG({
                      src: iconRef.current.outerHTML,
                      name: icon.name
                    })}
                    icon={<ImageIcon/>}
                  />
                </Tooltip>
                <Tooltip hasArrow label="Close overlay">
                  <IconButton
                    aria-label="Close overlay"
                    variant="ghost"
                    onClick={handleClose}
                    icon={<Close/>}
                  />
                </Tooltip>
              </ButtonGroup>
            </Flex>
            <Flex direction={{base: 'column', md: 'row'}}
                  alignItems={{base: 'center', md: 'flex-start'}}
                  maxW="100%"
                  gap={{base: 0, md: 8}}
            >
              <Flex>
                <Box
                  borderWidth="1px"
                  rounded="md"
                  position="relative"
                  bg={
                    colorMode == "light"
                      ? theme.colors.whiteAlpha[800]
                      : theme.colors.blackAlpha[900]
                  }
                  padding={0}
                >
                  <div
                    style={iconStyling}
                    className="icon-large"
                  >
                    <Icon
                      stroke={color}
                      strokeWidth={strokeWidth}
                      size={size}
                      ref={iconRef}
                    />

                  </div>

                  <svg className="icon-grid" width="24" height="24" viewBox={`0 0 ${size} ${size}`}
                       fill="none"
                       stroke={colorMode == "light" ? '#E2E8F0' : theme.colors.gray[600]}
                       strokeWidth="0.1" xmlns="http://www.w3.org/2000/svg">
                    {Array.from({length: (size - 1)}, (_, i) => (
                      <g key={`grid-${i}`}>
                        <line key={`horizontal-${i}`} x1={0} y1={i + 1} x2={size} y2={i + 1}/>
                        <line key={`vertical-${i}`} x1={i + 1} y1={0} x2={i + 1} y2={size}/>
                      </g>
                    ))}
                  </svg>
                </Box>
              </Flex>
              <Flex maxW="100%" minW={0} grow={1}>
                <IconCodeExamples icon={icon} maxW="100%" w="100%" />
              </Flex>
            </Flex>
            <Flex mt={{base: 4, md: 4}}
                  direction={{base: 'column', md: 'row'}}
                  alignItems={{base: 'flex-start', md: 'center'}}
            >
              <Wrap direction={'horizontal'} gap={2}>
                {tags.map((tag) => {
                  return (
                    <Tag
                      variant='subtle'
                      colorScheme='brand'
                      fontSize='md'
                    >{tag}</Tag>
                  )
                })}
              </Wrap>

              {icon?.contributors?.length ? (
                <Flex direction="row"
                      alignItems="center"
                      ml={{base: 'none', md: 'auto'}}
                      mt={{base: 4, md: 0}}
                >
                  <Heading as="h5" size="sm" mr="2" textTransform="uppercase">
                    Contributors:
                  </Heading>
                  <AvatarGroup size="md">
                    {icon.contributors.map((commit, index) => (
                      <Link href={`https://github.com/${commit.author}`} isExternal
                            key={`${index}_${commit.author}`}>
                        <Tooltip hasArrow label={commit.author} key={commit.author}>
                          <Avatar name={commit.author}
                                  size='md'
                                  src={`https://github.com/${commit.author}.png?size=88`}/>
                        </Tooltip>
                      </Link>
                    ))}
                  </AvatarGroup>
                </Flex>
              ) : null}
            </Flex>
          </Box>
        </Flex>
      </Slide>
    </Box>
  );
};

export default IconDetailOverlay;
