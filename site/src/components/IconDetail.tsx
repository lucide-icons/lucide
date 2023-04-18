import {
  Avatar,
  AvatarGroup,
  Hide,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Link,
  Tag,
  Tooltip,
  useColorMode,
  useToast,
  chakra,
  Wrap
} from '@chakra-ui/react';
import theme from '../lib/theme';
import download from 'downloadjs';
import {
  Code as CodeIcon,
  Copy as CopyIcon,
  createLucideIcon,
  Download as DownloadIcon,
  Image as ImageIcon,
  Maximize as MaximizeIcon,
  X as Close
} from 'lucide-react';
import {useRef} from 'react';
import {useCustomizeIconContext} from "./CustomizeIconContext";
import {Category, IconEntity} from '../types';
import IconCodeExamples from './IconCodeExamples';
import {useRouter} from 'next/router';

type IconDownload = {
  src: string;
  name: string;
};

interface IconDetailProps {
  showFullscreen?: boolean
  categories?: Category[]
  close?: () => void
  icon?: IconEntity
}

const IconDetail = ({
                      showFullscreen = false,
                      close,
                      icon,
                      categories = []
                    }: IconDetailProps) => {
  const toast = useToast();
  const {colorMode} = useColorMode();
  const {tags = [], name, iconNode, createdRelease} = icon ?? {};
  const {color, strokeWidth, size} = useCustomizeIconContext();
  const iconRef = useRef<SVGSVGElement>(null);
  const router = useRouter();


  if (icon == null) {
    return null
  }

  const goToCategory = (name: string) => {
    router.push(
      {
        pathname: `/icons`,
        hash: name,
      }
    )
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

  const downloadIcon = ({name = ''}: IconDownload) => download(iconRef.current.outerHTML, `${name}.svg`, 'image/svg+xml');

  const copyIcon = async ({name}: IconDownload) => {
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

  const goToIconPage = () => {
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
        shallow: false,
        scroll: true
      })
    close?.();
  };

  const iconCategories = icon.categories
    .map((name) => categories.find(c => c.name === name))
    .filter(c => c)

  return (
    <Flex direction='column' w='100%' textAlign='left'>
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
            <Box
              position="relative"
              style={{cursor: "pointer"}}
              onClick={() => copyName(icon.name)}
            >
              <CopyIcon style={{display: 'inline-block'}} />
              <chakra.span fontSize="3xl" fontFamily={theme.fonts.mono} ml={2}>
                {icon.name}
              </chakra.span>
              <Hide below='sm'>
                {createdRelease &&
                  <Badge marginLeft={2} variant='subtle' colorScheme='brand'>{createdRelease}</Badge>}
              </Hide>
            </Box>
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
          {showFullscreen && (
            <Tooltip hasArrow label="Show details">
              <IconButton
                aria-label="Show details"
                variant="ghost"
                onClick={goToIconPage}
                icon={<MaximizeIcon/>}
              />
            </Tooltip>
          )}
          {showFullscreen && (
            <Tooltip hasArrow label="Close overlay">
              <IconButton
                aria-label="Close overlay"
                variant="ghost"
                onClick={close}
                icon={<Close/>}
              />
            </Tooltip>)
          }
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
                <g key={`grid-${name}-${i}`}>
                  <line key={`horizontal-${name}-${i}`} x1={0} y1={i + 1} x2={size} y2={i + 1}/>
                  <line key={`vertical-${name}-${i}`} x1={i + 1} y1={0} x2={i + 1} y2={size}/>
                </g>
              ))}
            </svg>
          </Box>
        </Flex>
        <Flex maxW="100%" minW={0} grow={1}>
          <IconCodeExamples icon={icon}/>
        </Flex>
      </Flex>
      <Flex mt={{base: 4, md: 4}}
            direction={{base: 'column', md: 'row'}}
            alignItems={{base: 'flex-start', md: 'center'}}
            gap={4}
      >
        <Wrap direction={'row'} gap={2}>
          {iconCategories.map(({name, title, icon}, index) => {
            const Icon = icon ? createLucideIcon(icon.name, icon.iconNode) : null
            return (
              <Button
                onClick={() => goToCategory(name)}
                fontSize='md'
                variant='subtle'
                size='xs'
                key={`${icon.name}-category-${index}`}
                gap={1}
              >
                <Icon size={16} key={`${icon.name}-category-${index}-icon`} />
                {title}
              </Button>
            )
          })}
          {tags.map((tag) => {
            return (
              <Tag
                variant='tag'
                fontSize='md'
                key={`${name}-tag-${tag}`}
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
              {icon.contributors.map((author, index) => (
                <Link href={`https://github.com/${author}`} isExternal
                      key={`${name}-${index}_${author}`}>
                  <Tooltip hasArrow label={author} key={`${name}-${author}`}>
                    <Avatar name={author}
                            size='md'
                            boxShadow='0 0 2px currentColor'
                            src={`https://github.com/${author}.png?size=88`}/>
                  </Tooltip>
                </Link>
              ))}
            </AvatarGroup>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default IconDetail;
