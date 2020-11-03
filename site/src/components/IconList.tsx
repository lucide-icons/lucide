import { Button, Flex, Grid, Text, useToast } from "@chakra-ui/core";
import download from 'downloadjs';
import Link from 'next/link'
import copy from "copy-to-clipboard";
import {useContext} from "react";
import {IconStyleContext} from "./CustomizeIconContext";
import {IconWrapper} from "./IconWrapper";

const IconList = ({icons}) => {
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
          <Link key={name} href={`/?iconName=${name}`} as={`/icon/${name}`} scroll={false}>
            <Button
              variant="ghost"
              borderWidth="1px"
              rounded="lg"
              padding={16}
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
