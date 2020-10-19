import { useSpring, animated } from "react-spring";
import { Box, Text, CloseButton, useColorMode, Flex, ButtonGroup, Button, useToast } from "@chakra-ui/core";
import theme from "../lib/theme";
import download from 'downloadjs';
import copy from "copy-to-clipboard";

const IconDetailOverlay = ({ isOpen = true, onClose, icon }) => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { tags = [], name } = icon;

  const { transform, opacity } = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: `translateY(${isOpen ? -120 : 0}%)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleClose = () => {
    onClose();
  };

  const panelStyling = {
    transform: transform.interpolate(t => t),
    opacity: opacity.interpolate(o => o),
    width: "100%",
    willChange: "transform"
  }

  const iconStyling = (isLight) => ({
    height: "25vw",
    width: "25vw",
    minHeight: "160px",
    minWidth: "160px",
    maxHeight: "240px",
    maxWidth: "240px",
    color: (isLight ? theme.colors.gray[800] : theme.colors.white),
  });

  const downloadIcon = ({src, name}) => download(src, `${name}.svg`, 'image/svg+xml');

  const copyIcon = ({src, name}) => {
    copy(src);
    toast({
      title: "Copied!",
      description: `Icon "${name}" copied to clipboard.`,
      status: "success",
      duration: 1500,
    });
  }

  const donwloadPNG = ({src, name}) => {
    const canvas = document.createElement('canvas');
    canvas.width = 24;
    canvas.height = 24;
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
        <animated.div
          style={panelStyling}
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
            <CloseButton
              onClick={handleClose}
              position="absolute"
              top={4}
              right={4}
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
                    dangerouslySetInnerHTML={{ __html: icon.src }}
                    style={iconStyling(colorMode == "light")}
                    className="icon-large"
                  />

                  <svg className="icon-grid" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colorMode == "light" ? '#E2E8F0' : theme.colors.gray[600]} strokeWidth="0.1" xmlns="http://www.w3.org/2000/svg">
                    { Array.from({ length:23 }, (_, i) => (
                      <g key={`grid-${i}`}>
                        <line key={`horizontal-${i}`} x1={0} y1={i + 1} x2={24} y2={i + 1} />
                        <line key={`vertical-${i}`} x1={i + 1} y1={0} x2={i + 1} y2={24} />
                      </g>
                    )) }
                  </svg>
                </Box>
              </Flex>
              <Flex marginLeft={[0, 8]}>
                <Box>
                  <Text fontSize="3xl" style={{ cursor: "pointer" }} mb={1}>
                    {icon.name}
                  </Text>
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
                  <ButtonGroup spacing={4}>
                    <Button variant="solid" onClick={() => downloadIcon(icon)} mb={1}>
                      Download SVG
                    </Button>
                    <Button variant="solid" onClick={() => copyIcon(icon)} mb={1}>
                      Copy SVG
                    </Button>
                    <Button variant="solid" onClick={() => donwloadPNG(icon)} mb={1}>
                      Download PNG
                    </Button>
                  </ButtonGroup>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </animated.div>
      </Flex>
    </Box>
  );
};

export default IconDetailOverlay;
