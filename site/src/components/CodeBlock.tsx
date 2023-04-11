import {Box, BoxProps, chakra, useColorMode} from '@chakra-ui/react';
import nightOwlLightTheme from 'prism-react-renderer/themes/nightOwlLight';
import nightOwlDarkTheme from 'prism-react-renderer/themes/nightOwl';
import uiTheme from '../lib/theme';
import theme from '../lib/theme';
import BaseHighlight, {defaultProps, Language} from 'prism-react-renderer';
import CopyButton from './CopyButton';

const CodeContainer = (props: BoxProps) => (
  <Box paddingTop="3" paddingBottom="3" rounded="8px" height="100%" {...props} />
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
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    );
    return inRange;
  };
};

interface HighlightProps extends BoxProps {
  code: string;
  language?: Language;
  metastring?: string;
  showLines?: boolean;
}

function CodeBlock({code, language, metastring, showLines, ...props}: HighlightProps) {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  const {colorMode} = useColorMode();

  const backgroundColor =
    colorMode === 'light' ? uiTheme.colors.gray[100] : uiTheme.colors.gray[900];
  const codeTheme = colorMode === 'light' ? nightOwlLightTheme : nightOwlDarkTheme;

  const customizedCodeTheme = {
    ...codeTheme,
    plain: {
      ...codeTheme.plain,
      backgroundColor,
    },
  };

  return (
    <Box position="relative" zIndex="0" {...props}>
      <CodeContainer bg={backgroundColor}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <BaseHighlight
          {...defaultProps}
          code={code}
          language={language}
          theme={customizedCodeTheme}
        >
          {({className, style, tokens, getLineProps, getTokenProps}) => (
            <div
              style={{
                fontSize: 14,
                overflowX: 'auto',
                fontFamily: theme.fonts.mono,
                height: '100%'
              }}
              data-language={language}
            >
              <pre className={className} style={style}>
                {tokens.slice(0, -1).map((line, i) => {
                  const lineProps = getLineProps({line, key: i});
                  return (
                    <chakra.div
                      px="4"
                      bg={shouldHighlightLine(i) ? 'brandAlpha.100' : undefined}
                      borderLeftColor={shouldHighlightLine(i) ? 'brandAlpha.500' : 'brandAlpha.0'}
                      borderLeftStyle={shouldHighlightLine(i) ? 'solid' : undefined}
                      borderLeftWidth=".25rem"
                      {...lineProps}
                    >
                      {showLines && (
                        <chakra.span
                          opacity={0.3}
                          mr="4"
                          width="16px"
                          display="inline-block"
                          fontSize="xs"
                          style={{userSelect: 'none'}}
                        >
                          {i + 1}
                        </chakra.span>
                      )}
                      {line.map((token, key) => (
                        <span {...getTokenProps({token, key})}></span>
                      ))}
                    </chakra.div>
                  );
                })}
              </pre>
            </div>
          )}
        </BaseHighlight>
      </CodeContainer>
      <CopyButton
        size="sm"
        position="absolute"
        textTransform="uppercase"
        colorScheme="brand"
        fontSize="xs"
        p={1}
        zIndex="1"
        top="1.5"
        right="1.5"
        copyText={code}
        fontFamily={uiTheme.fonts.body}
        fontWeight="bold"
      />
    </Box>
  );
}

export default CodeBlock;
