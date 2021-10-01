import { Box, ButtonProps, Button, useClipboard } from '@chakra-ui/react';

const CopyButton = ({copyText, buttonText = 'copy', ...props}) => {
  const { hasCopied, onCopy } = useClipboard(copyText);

  return (
    <Button
      onClick={onCopy}
      {...props}
    >
      { hasCopied ? 'copied' : buttonText }
    </Button>
  )
};

export default CopyButton;
