import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  useColorMode,
  useUpdateEffect
} from '@chakra-ui/react';
import {Search as SearchIcon} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import theme from '../lib/theme';
import {useDebounce} from '../lib/useDebounce';
import {useRouterParam} from '../lib/useRouterParam';

interface SearchInputProps extends BoxProps {
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  count: number;
}

export const SearchInput = (({onChange, onSubmit, count, ...rest}: SearchInputProps) => {
    const {colorMode} = useColorMode();

    const [urlValue, setUrlValue] = useRouterParam('search');

    const [inputValue, setInputValue] = useState('');
    const debouncedValue = useDebounce(inputValue.trim(), 300);

    const submitInputValue = (event) => {
      event.preventDefault();
      if (onSubmit) {
        onSubmit(event.target[0].value);
      }
    };

    if (onChange) {
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
    }

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

    const rightElementWidth = theme.components.SearchInput.rightElementWidth;

    return (
      <Flex
        as="form"
        onSubmit={(event) => submitInputValue(event)}
        {...rest}
      >
        <InputGroup w="100%">
          <InputLeftElement
            children={
              <Icon>
                <SearchIcon/>
              </Icon>
            }
          />
          <Input
            ref={ref}
            placeholder={'Search icons'}
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            pr={[4, rightElementWidth]}
            focusBorderColor={colorMode == 'light' ? 'brand.500' : 'brand.500'}
          />
          <InputRightElement display={['none', 'flex']}
                             pointerEvents="none"
                             width={rightElementWidth}
          >
            <Box fontSize=".875rem"
                 textTransform="upperCase"
            >
              Press <Kbd>/</Kbd> to focus
            </Box>
          </InputRightElement>
        </InputGroup>
      </Flex>
    );
  }
);
