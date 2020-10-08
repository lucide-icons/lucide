import {
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
} from '@chakra-ui/core';
import copy from 'copy-to-clipboard';
import download from 'downloadjs';
import JSZip from 'jszip';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { getAllData } from '../lib/icons';
import useSearch from '../lib/search';
import { useRouter } from 'next/router';
import { useDebounce } from '../lib/useDebounce';

function generateZip(icons) {
  const zip = new JSZip();
  Object.values(icons).forEach((icon) =>
    // @ts-ignore
    zip.file(`${icon.name}.svg`, icon.src)
  );
  return zip.generateAsync({ type: 'blob' });
}

const IndexPage = ({ data }) => {
  const router = useRouter();
  const { query } = router.query;
  const [queryText, setQueryText] = useState(query || '');
  const toast = useToast();
  const debouncedQuery = useDebounce(queryText, 1000);
  const results = useSearch(data, queryText);

  useEffect(() => {
    setQueryText(query);
  }, [query]);

  useEffect(() => {
    router.push({
      pathname: '/',
      query: { query: debouncedQuery },
    });
  }, [debouncedQuery]);

  const inputElement = useRef(null);
  function handleKeyDown(event) {
    if (event.key === '/' && inputElement.current !== document.activeElement) {
      event.preventDefault();
      inputElement.current.focus();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Layout>
      <Flex direction="column" align="center" justify="center">
        <Text fontSize="3xl" as="b">
          Simply beautiful open source icons, community-sourced
        </Text>
        <Stack isInline marginTop={3} marginBottom={10}>
          <Button
            onClick={async () => {
              const zip = await generateZip(data);
              download(zip, 'feather.zip');
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
          placeholder={`Search ${Object.keys(data).length} icons (Press "/" to focus)`}
          value={queryText}
          onChange={(event) => setQueryText(event.target.value)}
          marginBottom={5}
        />
      </InputGroup>
      {results.length > 0 ? (
        <Grid templateColumns={`repeat(auto-fill, minmax(160px, 1fr))`} gap={5}>
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
                      title: 'Copied!',
                      description: `Icon "${actualIcon.name}" copied to clipboard.`,
                      status: 'success',
                      duration: 1500,
                    });
                  } else {
                    download(actualIcon.src, `${actualIcon.name}.svg`, 'image/svg+xml');
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
          style={{ wordBreak: 'break-word' }}
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
