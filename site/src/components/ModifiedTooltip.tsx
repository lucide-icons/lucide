import { Box, Tooltip, useColorMode } from "@chakra-ui/react";
import theme from '../lib/theme';

const ModifiedTooltip = () => {
  const { colorMode } = useColorMode();

  return (
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
  )
}

export default ModifiedTooltip;
