import { Button, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import download from 'downloadjs';
import Link from 'next/link'
import copy from "copy-to-clipboard";
import { memo, useContext } from "react";
import { IconStyleContext } from "./CustomizeIconContext";
import {IconWrapper} from "./IconWrapper";
import { useRouter } from "next/router";
import ModifiedTooltip from './ModifiedTooltip';


const IconListItem = ({ name, content, contributors }) => {
  const toast = useToast();
  const {color, size, strokeWidth} = useContext(IconStyleContext);

  return (
    <Button
      variant="ghost"
      borderWidth="1px"
      rounded="lg"
      padding={16}
      position="relative"
      onClick={(event) => {
        if (event.shiftKey) {
          copy(icon.src);
          toast({
            title: "Copied!",
            description: `Icon "${name}" copied to clipboard.`,
            status: "success",
            duration: 1500,
          });
        }
        if (event.metaKey) {
          download(
            icon.src,
            `${name}.svg`,
            "image/svg+xml"
          );
        }
      }}
      key={name}
      alignItems="center"
    >
      { contributors?.length ? ( <ModifiedTooltip/> ) : null}
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
  )
}

export default memo(IconListItem)
