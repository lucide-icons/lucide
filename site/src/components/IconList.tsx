import { Button, Flex, Grid, Text, useToast } from "@chakra-ui/core";
import download from 'downloadjs';
import copy from "copy-to-clipboard";
import {useContext} from "react";
import {IconStyleContext} from "./CustomizeIconContext";
import {IconWrapper} from "./IconWrapper";
import { useRouter } from "next/router";

const IconList = ({icons, enableClick = true, iconListItemProps = {}}) => {
  const router = useRouter();
  const toast = useToast();
  const {color, size, strokeWidth} = useContext(IconStyleContext);

  return (
    <Grid
      templateColumns={`repeat(auto-fill, minmax(160px, 1fr))`}
      gap={5}
    >
      { icons.map((icon) => {
        // @ts-ignore
        const actualIcon = icon.item ? icon.item : icon;
        const { name, content } = actualIcon;

        return (
            <Button
              variant="ghost"
              borderWidth="1px"
              rounded="lg"
              padding={16}
              key={name}
              icon={name}
              opacity={0.999}
              position="relative"
              _focus={{ outline: 'none'}}
              onClick={(event) => {
                if(!enableClick) return;
                if (event.shiftKey) {
                  copy(actualIcon.src);
                  toast({
                    title: "Copied!",
                    description: `Icon "${name}" copied to clipboard.`,
                    status: "success",
                    duration: 1500,
                  });
                }
                else if (event.metaKey) download(actualIcon.src, `${name}.svg`, "image/svg+xml");
                else {
                  router.push(`/?iconName=${name}`, `/icon/${name}`)
                }
              }}
              alignItems="center"
              {...iconListItemProps}
            >
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
          );
      })}
    </Grid>
  );
}

export default IconList;
