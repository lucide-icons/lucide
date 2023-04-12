import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useUpdateEffect,
} from '@chakra-ui/react';
import { Search as SearchIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import theme from '../lib/theme';
import { useDebounce } from '../lib/useDebounce';
import { useRouterParam } from '../lib/useRouterParam';

interface SearchInputProps {
  onChange(value: string): void;
  count: number;
}

export const SearchInput = ({ onChange, count }: SearchInputProps) => {
  const { colorMode } = useColorMode();

  const [urlValue, setUrlValue] = useRouterParam('search');

  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue.trim(), 300);

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
      if (event.key === '/' && ref.current !== document.activeElement) {
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
            <SearchIcon />
          </Icon>
        }
      />
      <Input
        ref={ref}
        placeholder={`Search ${count} icons (Press "/" to focus)`}
        onChange={event => setInputValue(event.target.value)}
        value={inputValue}
        bg={colorMode == 'light' ? theme.colors.white : theme.colors.gray[700]}
      />
    </InputGroup>
  );
};
