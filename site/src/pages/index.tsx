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
import { StringParam, useQueryParam } from "use-query-params";
import Layout from "../components/Layout";
import { getAllData } from "../lib/icons";
import useSearch from "../lib/search";

const IndexPage = ({ data }) => {
  const [query, setQuery] = useQueryParam("query", StringParam);
  const results = useSearch(data, query || "");
  const toast = useToast();

  return (
    <Layout>
      <InputGroup>
        <InputLeftElement children={<Icon name="search" />} />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          marginBottom={5}
        />
      </InputGroup>
      <Grid templateColumns="repeat(5, 1fr)" gap={5}>
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
            >
              <Flex direction="column" align="center" justify="center">
                <div dangerouslySetInnerHTML={{ __html: actualIcon.src }} />
                <Text marginTop={5}>{actualIcon.name}</Text>
              </Flex>
            </Button>
          );
        })}
      </Grid>
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
