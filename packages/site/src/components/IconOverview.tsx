import { Box, Button, Flex, Grid, Icon, Input, InputGroup, InputLeftElement, Text, useToast } from "@chakra-ui/core";
import Link from 'next/link'
import copy from "copy-to-clipboard";
import IconList from "./IconList";
import { useEffect, useRef, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import useSearch from "../lib/search";
import theme from "../lib/theme";

const IconOverview = ({data}) => {
  const [query, setQuery] = useQueryParam("query", StringParam);
  const [searchString, setSearchString] = useState(query || '')
  const results = useSearch(data, query || '');
  const inputElement = useRef(null);

  function handleKeyDown(event) {
    if (event.key === "/" && inputElement.current !== document.activeElement) {
      event.preventDefault();
      inputElement.current.focus();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  const search = ({target}) => {
    setSearchString(target.value);
    setQuery(target.value);
  }
  
  return (
    <>
    <InputGroup position="sticky" top={2} zIndex={1}>
        <InputLeftElement children={<Icon name="search" />} />
        <Input
          ref={inputElement}
          placeholder={`Search ${
            Object.keys(data).length
          } icons (Press "/" to focus)`}
          defaultValue={searchString}
          onChange={search}
          marginBottom={5}
        />
      </InputGroup>
      {results.length > 0 ? (
        <IconList icons={results} />
      ) : (
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          style={{ wordBreak: "break-word" }}
        >
          No results found for "{query}"
        </Text>
      )}
    </>
  );
}

export default IconOverview;