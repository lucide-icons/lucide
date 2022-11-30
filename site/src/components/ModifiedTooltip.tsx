import { Box, Tooltip } from "@chakra-ui/react";

const ModifiedTooltip = () => {
  return (
    <Tooltip
      hasArrow
      label="This is new or modified icon"
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
