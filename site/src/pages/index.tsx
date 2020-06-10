import {
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/core";
import copy from "copy-to-clipboard";
import download from "downloadjs";
import { useEffect, useRef, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import Layout from "../components/Layout";
import { getAllData } from "../lib/icons";
import useSearch from "../lib/search";

const IndexPage = ({ data }) => {
  const [query, setQuery] = useQueryParam("query", StringParam);
  const results = useSearch(data, query || "");
  const toast = useToast();

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

  const [numColumns, setNumColumns] = useState(1);
  useEffect(() => {
    setNumColumns(Math.floor(window.outerWidth / 160));
  }, []);

  return (
    <Layout>
      <InputGroup position="sticky" top={2} zIndex={1}>
        <InputLeftElement children={<Icon name="search" />} />
        <Input
          ref={inputElement}
          placeholder={`Search ${
            Object.keys(data).length
          } icons (Press "/" to focus)`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          marginBottom={5}
        />
      </InputGroup>
      {results.length > 0 ? (
        <Grid
          templateColumns={`repeat(${numColumns > 5 ? 5 : numColumns}, 1fr)`}
          gap={5}
        >
          {results.map((icon) => {
            // @ts-ignore
            const actualIcon = icon.item ? icon.item : icon;
            return (
              <Button
                variant="ghost"
                borderWidth="1px"
                rounded="lg"
                padding={16}
                onClick={(event) => {
                  if (event.shiftKey) {
                    copy(actualIcon.src);
                    toast({
                      title: "Copied!",
                      description: `Icon "${actualIcon.name}" copied to clipboard.`,
                      status: "success",
                      duration: 1500,
                    });
                  } else {
                    download(
                      actualIcon.src,
                      `${actualIcon.name}.svg`,
                      "image/svg+xml"
                    );
                  }
                }}
                key={actualIcon.name}
                alignItems="center"
              >
                <Flex direction="column" align="center" justify="center">
                  <div dangerouslySetInnerHTML={{ __html: actualIcon.src }} />
                  <Text marginTop={5}>{actualIcon.name}</Text>
                </Flex>
              </Button>
            );
          })}
        </Grid>
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
    </Layout>
  );
};

export async function getStaticProps() {
  let data = getAllData();
  return {
    props: {
      data,
    },
  };
}

export default IndexPage;
