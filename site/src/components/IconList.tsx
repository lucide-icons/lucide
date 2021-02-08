import { Button, Flex, Grid, Text, useToast, Box, Tooltip, useColorMode } from "@chakra-ui/core";
import download from 'downloadjs';
import Link from 'next/link'
import copy from "copy-to-clipboard";
import {useContext, useMemo} from "react";
import {IconStyleContext} from "./CustomizeIconContext";
import {IconWrapper} from "./IconWrapper";
import { useRouter } from "next/router";
import theme from '../lib/theme';

const IconList = ({icons}) => {
  const router = useRouter()
  const toast = useToast();
  const { colorMode } = useColorMode();
  const {color, size, strokeWidth} = useContext(IconStyleContext);
  const { search } = router.query;

  const query = useMemo(()=> search !== undefined ? { search } : {},[search])

  return (
    <Grid
      templateColumns={`repeat(auto-fill, minmax(160px, 1fr))`}
      gap={5}
      marginBottom="320px"
    >
      { icons.map((icon) => {
        const actualIcon = icon.item ? icon.item : icon;
        const { name, content, contributers } = actualIcon;

        return (
          <Link
            key={name}
            scroll={false}
            href={{
              pathname: '/icon/[iconName]',
              query: {
                ...query,
                iconName: name,
              },
            }}
          >
            <Button
              variant="ghost"
              borderWidth="1px"
              rounded="lg"
              padding={16}
              position="relative"
              onClick={(event) => {
                if (event.shiftKey) {
                  copy(actualIcon.src);
                  toast({
                    title: "Copied!",
                    description: `Icon "${name}" copied to clipboard.`,
                    status: "success",
                    duration: 1500,
                  });
                }
                if (event.metaKey) {
                  download(
                    actualIcon.src,
                    `${name}.svg`,
                    "image/svg+xml"
                  );
                }
              }}
              key={name}
              alignItems="center"
            >
              { contributers?.length ? (
                <Tooltip
                  hasArrow
                  label="This is new or modified icon"
                  bg={colorMode === 'light' ? theme.colors.white : theme.colors.gray[700]}
                  color={colorMode === 'dark' ? theme.colors.white : null}
                >
                  <Box
                    {
                      ...{
                        position: 'absolute',
                        height: '8px',
                        width: '8px',
                        background: '#F56565',
                        top: '8px',
                        right: '8px',
                        borderRadius: '4px'
                      }
                    }
                  />
                </Tooltip>
              ) : null}
              <Flex direction="column" align="center" justify="center">
                <IconWrapper
                  content={content}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  height={size}
                  width={size}
                />
                <Text marginTop={5}>{name}</Text>
              </Flex>
            </Button>
          </Link>
        );
      })}
    </Grid>
  );
}

export default IconList;
