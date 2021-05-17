import { Button, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import download from 'downloadjs';
import copy from "copy-to-clipboard";
import {useContext, useMemo} from "react";
import {IconStyleContext} from "./CustomizeIconContext";
import {IconWrapper} from "./IconWrapper";
import IconListItem from './IconListItem';
import { useRouter } from "next/router";

const IconList = ({icons, enableClick = true, iconListItemProps = {}}) => {
  const router = useRouter();
  const toast = useToast();
  const {color, size, strokeWidth} = useContext(IconStyleContext);
  const { search } = router.query;

  const query = useMemo(()=> search !== undefined ? { search } : {},[search])
  const onClick = (event, icon) => {
    if (event.shiftKey) {
      copy(icon.src);
      toast({
        title: "Copied!",
        description: `Icon "${name}" copied to clipboard.`,
        status: "success",
        duration: 1500,
      });
    }
    else if (event.metaKey) {
      download(
        icon.src,
        `${name}.svg`,
        "image/svg+xml"
      );
    }
    else {
      router.push(`/?iconName=${name}`, `/icon/${name}`)
    }
  }

  return (
    <Grid
      templateColumns={`repeat(auto-fill, minmax(150px, 1fr))`}
      gap={5}
    >
      {
        icons.map((icon) => (
          <IconListItem
            icon={{...icon, color, size, strokeWidth }}
            onClick={onClick}
            {...iconListItemProps}
          />
        )
      )}
    </Grid>
  );
}

export default IconList;
