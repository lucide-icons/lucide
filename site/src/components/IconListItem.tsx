import { Button, Flex, Text } from "@chakra-ui/react";

import {IconWrapper} from "./IconWrapper";
import ModifiedTooltip from './ModifiedTooltip';

const IconListItem = ({icon, onClick = (event, icon) => null, ...rest}) => {

  return (
    <Button
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
      {...rest}
    >
      { icon.contributors?.length ? ( <ModifiedTooltip/> ) : null}
      <Flex direction="column" align="center" justify="center">
        <IconWrapper
          content={icon.content}
          stroke={icon.color}
          strokeWidth={icon.strokeWidth}
          height={icon.size}
          width={icon.size}
        />
        <Text marginTop={5}>{icon.name}</Text>
      </Flex>
    </Button>
  )
}

export default IconListItem;
