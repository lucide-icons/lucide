import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import memoize from 'lodash/memoize';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import SvgPreview from 'src/components/SvgPreview';
import Dropzone from './Dropzone';
import highlight from './highlight';
import format from './format';
import { getPaths } from '../SvgPreview/utils';

const useIsDragging = (onDropCallback: (value: File) => void) => {
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const onStart = () => setIsDragging(true);
    const onEnd = () => setIsDragging(false);
    const onDrop = (e: DragEvent) => {
      if (e.dataTransfer.files[0]) {
        onDropCallback(e.dataTransfer.files[0]);
      }
      setIsDragging(false);
    };
    window.addEventListener('dragover', onStart);
    window.addEventListener('dragleave', onEnd);
    window.addEventListener('dragend', onEnd);
    window.addEventListener('drop', onDrop);
    return () => {
      window.removeEventListener('dragover', onStart);
      window.removeEventListener('dragleave', onEnd);
      window.removeEventListener('dragend', onEnd);
      window.removeEventListener('drop', onDrop);
    };
  }, [onDropCallback]);
  return isDragging;
};

const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncing, setDebouncing] = useState(false);

  useEffect(() => {
    setDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncing(false);
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, debouncing] as const;
};

export const swallowError =
  <T extends (...args: any[]) => any, F>(fn: T, fallback: F) =>
  (...args: Parameters<T>): ReturnType<T> | F => {
    try {
      return fn(...args);
    } catch (e) {
      return fallback;
    }
  };

const mHighlight = memoize(highlight);

const iconStyling = {
  height: 'min-content',
  width: '25vw',
  minWidth: '320px',
  maxWidth: '840px',
};

type IconEditorHeaderProps = {
  isPreviewOpen: boolean;
  setIsPreviewOpen: (value: boolean) => void;
  heading: React.ReactNode;
  children: React.ReactNode;
};

const IconEditorHeader = ({
  isPreviewOpen,
  setIsPreviewOpen,
  children,
  heading,
}: IconEditorHeaderProps) => (
  <Flex width="100%" gap={6} flexDirection={{ base: 'column', lg: 'row' }}>
    {heading}
    <Flex justifyContent="space-between" flex={1}>
      <Box>
        <ButtonGroup display={{ lg: 'none' }}>
          <Button
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            colorScheme={isPreviewOpen ? 'blue' : undefined}
            onClick={() => setIsPreviewOpen(true)}
          >
            Preview
          </Button>
          <Button
            onClick={() => setIsPreviewOpen(false)}
            colorScheme={isPreviewOpen ? undefined : 'blue'}
            style={{
              marginInlineStart: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            Code
          </Button>
        </ButtonGroup>
      </Box>
      <Box justifyContent="center">{children}</Box>
    </Flex>
  </Flex>
);

type IconEditorProps = {
  value: string;
  defaultValue: string;
  onChange: (value: string) => void;
  heading: React.ReactNode;
  actions: React.ReactNode[];
};
const IconEditor = ({ value, onChange, actions, heading, defaultValue }: IconEditorProps) => {
  const [isPreviewTabOpen, setIsPreviewOpen] = useState(true);

  const onFileAccepted = (file: File) =>
    file.text().then((value) => onChange(swallowError(format, value)(value)));

  const isDraggingState = useIsDragging(onFileAccepted);
  const [isDraggingDebounced, debouncing] = useDebounce(isDraggingState, 250);

  const isDragging = debouncing || isDraggingDebounced;
  const isPreviewOpen = isPreviewTabOpen || isDragging;

  const paths = swallowError(getPaths, [])(value);

  return (
    <Flex
      flexDirection="column"
      gap={4}
      flex={1}
      alignItems={{ base: isPreviewOpen ? 'center' : 'start', lg: 'start' }}
    >
      <IconEditorHeader
        heading={heading}
        isPreviewOpen={isPreviewOpen}
        setIsPreviewOpen={setIsPreviewOpen}
      >
        <Flex gap={2}>{actions}</Flex>
      </IconEditorHeader>
      <Flex minWidth="320px" width={{ base: isPreviewOpen ? 'inherit' : '100%', lg: 'inherit' }}>
        {!isDragging && value !== defaultValue && paths.length ? (
          <Box
            style={iconStyling}
            className="icon-large"
            display={{ base: isPreviewOpen ? 'block' : 'none', lg: 'block' }}
          >
            <SvgPreview src={paths} showGrid />
          </Box>
        ) : (
          <Box display={{ base: isPreviewOpen ? 'block' : 'none', lg: 'block' }}>
            <Dropzone onFileAccepted={onFileAccepted} />
          </Box>
        )}
        <Box display={{ base: isPreviewOpen ? 'none' : 'block', lg: 'block' }} width={'100%'}>
          <Editor
            value={value}
            onValueChange={onChange}
            onBlur={() => onChange(swallowError(format, value)(value))}
            style={{
              height: '100%',
              width: '100%',
              minHeight: '320px',
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
            padding={12}
            highlight={(value) => swallowError(mHighlight, value)(value)}
          />
        </Box>
        <style>{'textarea.npm__react-simple-code-editor__textarea:focus { outline: none }'}</style>
      </Flex>
    </Flex>
  );
};

export default IconEditor;
