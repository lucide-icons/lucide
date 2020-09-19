import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/core";

import JSZip from "jszip";
import download from "downloadjs";
import { useEffect, useRef, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import Layout from "../components/Layout";
import { getAllData } from "../lib/icons";
import useSearch from "../lib/search";
import IconOverview from "../components/IconOverview";
import IconDetailOverlay from "../components/IconDetailOverlay";
import { useRouter } from "next/router";

function generateZip(icons) {
  const zip = new JSZip();
  Object.values(icons).forEach((icon) =>
    // @ts-ignore
    zip.file(`${icon.name}.svg`, icon.src)
  );
  return zip.generateAsync({ type: "blob" });
}

const IndexPage = ({ data }) => {
  const router = useRouter();

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

  const search = ({target}) => {
    setSearchString(target.value);
    setQuery(target.value);
  }

  const getIcon = (iconName) => data.find(({name}) => name === iconName) || {};

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Layout>
      <IconDetailOverlay
        isOpen={!!router.query.iconName} 
        icon={getIcon(router.query.iconName)}
        onClose={() => router.push('/')}
      />
      <Flex direction="column" align="center" justify="center">
        <Text fontSize="3xl" as="b">
          Simply beautiful open source icons, community-sourced
        </Text>
        <Stack isInline marginTop={3} marginBottom={10}>
          <Button
            onClick={async () => {
              const zip = await generateZip(data);
              download(zip, "feather.zip");
            }}
          >
            Download all
          </Button>
        </Stack>
      </Flex>
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
        <IconOverview icons={results} />
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
