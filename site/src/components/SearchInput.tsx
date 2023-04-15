import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  useBreakpointValue,
  useUpdateEffect,
} from '@chakra-ui/react';
import {Search as SearchIcon} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import theme from '../lib/theme';
import {useDebounce} from '../lib/useDebounce';
import {useRouterParam} from '../lib/useRouterParam';

interface SearchInputProps {
  onChange(value: string): void;

  count: number;
}

export const SearchInput = ({onChange, count}: SearchInputProps) => {
  const [urlValue, setUrlValue] = useRouterParam('search');

  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue.trim(), 300);
  const rightElementWidth = theme.components.SearchInput.rightElementWidth;
  const placeholder = useBreakpointValue({base: 'Search icons...', md: `Search ${count} icons...`});

  useUpdateEffect(() => {
    onChange(debouncedValue);
    setUrlValue(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (urlValue && !inputValue) {
      setInputValue(urlValue);
      onChange(urlValue);
    }
  }, [urlValue]);

  const ref = useRef(null);

  // Keyboard `/` shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === '/' && ref.current !== document.activeElement)
        || (event.ctrlKey && event.key === 'f')
      ) {
        event.preventDefault();
        ref.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <InputGroup>
      <InputLeftElement
        children={
          <Icon>
            <SearchIcon/>
          </Icon>
        }
      />
      <Input
        ref={ref}
        placeholder={placeholder}
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
        pr={[4, rightElementWidth]}
      />
      <InputRightElement display={['none', 'flex']}
                         pointerEvents="none"
                         width={rightElementWidth}
      >
        <Box fontSize=".875rem"
             textTransform="uppercase"
        >
          Press <Kbd>/</Kbd> to focus
        </Box>
      </InputRightElement>
    </InputGroup>
  );
};
