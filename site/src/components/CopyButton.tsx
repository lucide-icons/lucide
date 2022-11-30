import {IconButton, Tooltip, useClipboard} from '@chakra-ui/react';
import {Check, Copy} from 'lucide-react';

const CopyButton = ({copyText, buttonText = 'Copy to clipboard', ...props}) => {
  const {hasCopied, onCopy} = useClipboard(copyText);

  return (
    <Tooltip hasArrow label="Copy to clipboard">
      <IconButton
        onClick={onCopy} {...props}
        aria-label={buttonText}
        icon={(hasCopied ? <Check size={12}/> : <Copy size={12}/>)}
      />
    </Tooltip>
  );
};

export default CopyButton;
