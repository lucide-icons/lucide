import { Box, Text, IconButton, useColorMode, Flex, Slide, ButtonGroup, Button, useToast, Heading, Avatar, AvatarGroup, Link, Tooltip, useMediaQuery, useDisclosure } from "@chakra-ui/react";
import theme from "../lib/theme";
import download from 'downloadjs';
import copy from "copy-to-clipboard";
import { X as Close } from 'lucide-react';
import {useContext, useEffect, useRef} from "react";
import {IconStyleContext} from "./CustomizeIconContext";
import {IconWrapper} from "./IconWrapper";
import ModifiedTooltip from "./ModifiedTooltip";

type IconDownload = {
  src: string;
  name: string;
};

const IconDetailOverlay = ({ open = true, close, icon }) => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { tags = [], name } = icon;
  const {color, strokeWidth, size} = useContext(IconStyleContext);
  const iconRef = useRef<SVGSVGElement>(null);
  const [isMobile] = useMediaQuery("(max-width: 560px)")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    onClose();
    close();
  };

  useEffect(() => {
    if(open) {
      onOpen()
    }
  }, [open])

  const iconStyling = (isLight) => ({
    height: "25vw",
    width: "25vw",
    minHeight: "160px",
    minWidth: "160px",
    maxHeight: "240px",
    maxWidth: "240px",
    color: color,
  });

  const downloadIcon = ({src, name} : IconDownload) => download(src, `${name}.svg`, 'image/svg+xml');

  const copyIcon = ({src, name} : IconDownload) => {
    copy(src);
    toast({
      title: "Copied!",
      description: `Icon "${name}" copied to clipboard.`,
      status: "success",
      duration: 1500,
      isClosable: true
    });
  }

  const downloadPNG = ({src, name}: IconDownload) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = `data:image/svg+xml;base64,${btoa(src)}`;
    image.onload = function() {
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
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        pt={4}
        pb={4}
        maxW="850px"
        margin="0 auto"
        w="full"
        px={8}
      >

          <Box
            borderWidth="1px"
            rounded="lg"
            width="full"
            boxShadow={theme.shadows.xl}
            position="relative"
            bg={
              colorMode == "light"
                ? theme.colors.white
                : theme.colors.gray[700]
            }
            padding={8}
          >
            <IconButton
              size="sm"
              aria-label="Close overlay"
              variant="ghost"
              color="current"
              ml="3"
              position="absolute"
              top={4}
              right={4}
              onClick={handleClose}
              icon={<Close />}
          />
            <Flex direction={['column', 'row']} alignItems={['center', 'flex-start']}>
              <Flex>
                <Box
                  borderWidth="1px"
                  rounded="md"
                  position="relative"
                  bg={
                    colorMode == "light"
                      ? theme.colors.whiteAlpha[800]
                      : theme.colors.blackAlpha[500]
                  }
                  padding={0}
                >
                  <div
                    style={iconStyling(colorMode == "light")}
                    className="icon-large"
                  >
                    <IconWrapper
                      content={icon.content}
                      stroke={color}
                      strokeWidth={strokeWidth}
                      height={size}
                      width={size}
                      ref={iconRef}
                    />
                  </div>

                  <svg className="icon-grid" width="24" height="24" viewBox={`0 0 ${size} ${size}`} fill="none" stroke={colorMode == "light" ? '#E2E8F0' : theme.colors.gray[600]} strokeWidth="0.1" xmlns="http://www.w3.org/2000/svg">
                    { Array.from({ length:(size - 1) }, (_, i) => (
                      <g key={`grid-${i}`}>
                        <line key={`horizontal-${i}`} x1={0} y1={i + 1} x2={size} y2={i + 1} />
                        <line key={`vertical-${i}`} x1={i + 1} y1={0} x2={i + 1} y2={size} />
                      </g>
                    )) }
                  </svg>
                </Box>
              </Flex>
              <Flex marginLeft={[0, 8]} w="100%">
                <Box w="100%">
                  <Flex
                    justify={isMobile ? 'center' : 'flex-start'}
                    marginTop={isMobile ? 10 : 0}
                  >
                    <Box
                      position="relative"
                      mb={1}
                      display="inline-block"
                      style={{ cursor: "pointer" }}
                      pr={6}
                    >
                      <Text fontSize="3xl">
                        {icon.name}
                      </Text>
                      { icon?.contributors?.length ? ( <ModifiedTooltip/> ) : null}
                    </Box>
                  </Flex>
                  <Box mb={4}>
                    { tags?.length ? (
                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color={
                          colorMode === "light"
                          ? 'gray.600'
                          : 'gray.500'
                        }
                      >
                        { tags.join(' • ') }
                      </Text>
                    ) : ''}

                  {/* <Button size="sm" fontSize="md" variant="ghost" onClick={() => downloadIcon(icon)}>
                    Edit Tags
                  </Button> */}
                  </Box>
                  <Box overflowY="auto" w="100%" pt={1} pb={1}>
                    <ButtonGroup spacing={4}>
                      <Button variant="solid" onClick={() => downloadIcon({src: iconRef.current.outerHTML, name: icon.name})} mb={1}>
                        Download SVG
                      </Button>
                      <Button variant="solid" onClick={() => copyIcon({src: iconRef.current.outerHTML, name: icon.name})} mb={1}>
                        Copy SVG
                      </Button>
                      <Button variant="solid" onClick={() => downloadPNG({src: iconRef.current.outerHTML, name: icon.name})} mb={1}>
                        Download PNG
                      </Button>
                    </ButtonGroup>
                  </Box>
                  { icon?.contributors?.length ? (
                    <>
                      <Heading as="h5" size="sm" marginTop={4} marginBottom={2}>
                        Contributors:
                      </Heading>
                      <AvatarGroup size="md">
                        { icon.contributors.map((commit, index) => (
                          <Link href={`https://github.com/${commit.author}`} isExternal key={`${index}_${commit.sha}`}>
                            <Tooltip label={commit.author} key={commit.sha}>
                              <Avatar name={commit.author} src={`https://github.com/${commit.author}.png?size=88`} />
                            </Tooltip>
                          </Link>
                        )) }
                      </AvatarGroup>
                    </>
                  ) : null }
                </Box>
              </Flex>
            </Flex>
          </Box>

      </Flex>
      </Slide>
    </Box>
  );
};

export default IconDetailOverlay;
