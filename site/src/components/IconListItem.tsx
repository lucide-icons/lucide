import { Button, Flex, forwardRef, Text } from "@chakra-ui/react";

import {IconWrapper} from "./IconWrapper";
import ModifiedTooltip from './ModifiedTooltip';

const IconListItem = forwardRef(({icon, onClick = (event, icon) => null, ...rest}, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      borderWidth="1px"
      rounded="lg"
      padding={16}
      key={icon.name}
      opacity={0.999}
      position="relative"
      alignItems="center"
      _focus={{ outline: 'none'}}
      onClick={(event) => onClick(event, icon)}
      color="white"
      {...rest}
    >
      { icon?.contributors?.length ? ( <ModifiedTooltip/> ) : null}
      <Flex direction="column" align="center" justify="center">
        <IconWrapper
          content={icon.content}
          stroke={icon.color || 'currentColor'}
          strokeWidth={icon.strokeWidth}
          height={icon.size || 24}
          width={icon.size || 24}
        />
        <Text marginTop={5}>{icon.name}</Text>
      </Flex>
    </Button>
  )
})

export default IconListItem;
