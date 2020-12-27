import { Box, BoxProps, Button, ButtonProps, useClipboard, chakra } from '@chakra-ui/core';
import theme from 'prism-react-renderer/themes/nightOwl';
import BaseHighlight, { defaultProps, Language } from 'prism-react-renderer';
import { CSSProperties, useCallback } from 'react';

const liveEditorStyle: CSSProperties = {
  fontSize: 14,
  overflowX: 'auto',
  fontFamily: 'SF Mono, Menlo, monospace'
};

const CopyButton = (props: ButtonProps) => (
  <Button
    size="sm"
    position="absolute"
    textTransform="uppercase"
    colorScheme="teal"
    fontSize="xs"
    height="24px"
    top={0}
    zIndex="1"
    right="1.25em"
    {...props}
  />
);

const CodeContainer = (props: BoxProps) => (
  <Box
    paddingTop="5"
    paddingBottom="5"
    rounded="8px"
    my="8"
    bg="#011627"
    {...props} />
);

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false;
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map(v => v.split(`-`).map(x => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

interface HighlightProps {
  code: string;
  language: Language;
  metastring?: string;
  showLines?: boolean;
}

function CodeBlock({ code, language, metastring, showLines, ...props }: HighlightProps) {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <Box position="relative" zIndex="0">
      <CodeContainer>
        <BaseHighlight
          {...defaultProps}
          code={code}
          language={language}
          theme={theme}
          {...props}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div style={liveEditorStyle} data-language={language}>
              <pre className={className} style={style}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });
                  return (
                    <chakra.div
                      px="5"
                      bg={shouldHighlightLine(i) ? 'whiteAlpha.200' : undefined}
                      {...lineProps}
                    >
                      {showLines && (
                        <chakra.span opacity={0.3} mr="4" width="16px" display="inline-block" fontSize="xs" style={{ userSelect: 'none' }}>
                          {i + 1}
                        </chakra.span>
                      )}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </chakra.div>
                  );
                })}
              </pre>
            </div>
          )}
        </BaseHighlight>
      </CodeContainer>
      <CopyButton top="4" onClick={onCopy}>
        {hasCopied ? 'copied' : 'copy'}
      </CopyButton>
    </Box>
  );
}

export default CodeBlock;
