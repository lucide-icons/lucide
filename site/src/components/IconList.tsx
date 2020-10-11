import { Button, Flex, Grid, Text, useToast } from "@chakra-ui/core";
import download from 'downloadjs';
import Link from 'next/link'
import copy from "copy-to-clipboard";

const IconList = ({icons}) => {
  const toast = useToast();

  return (
    <Grid
      templateColumns={`repeat(auto-fill, minmax(160px, 1fr))`}
      gap={5}
    >
      { icons.map((icon) => {
        // @ts-ignore
        const actualIcon = icon.item ? icon.item : icon;
        const { name, src } = actualIcon;

        return (
          <Link key={name} href={`/?iconName=${name}`} as={`/icon/${name}`} scroll={false}>
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
                    description: `Icon "${name}" copied to clipboard.`,
                    status: "success",
                    duration: 1500,
                  });
                }
                if (event.metaKey) {
                  download(
                    actualIcon.src,
                    `${name}.svg`,
                    "image/svg+xml"
                  );
                }
              }}
              key={name}
              alignItems="center"
            >
              <Flex direction="column" align="center" justify="center">
                <div dangerouslySetInnerHTML={{ __html: src }} />
                <Text marginTop={5}>{name}</Text>
              </Flex>
            </Button>
          </Link>
        );
      })}
    </Grid>
  );
}

export default IconList;
