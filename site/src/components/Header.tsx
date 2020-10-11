import {
  Button,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/core";
import download from "downloadjs";
import JSZip from "jszip";

function generateZip(icons) {
  const zip = new JSZip();
  Object.values(icons).forEach((icon) =>
    // @ts-ignore
    zip.file(`${icon.name}.svg`, icon.src)
  );
  return zip.generateAsync({ type: 'blob' });
}

const Header = ({ data }) => {
  const downloadAllIcons = async () => {

    const zip = await generateZip(data);
    download(zip, 'feather.zip');
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Text fontSize="3xl" as="b">
        Simply beautiful open source icons, community-sourced.
      </Text>
      <Stack isInline marginTop={3} marginBottom={10}>
        <Button
          onClick={downloadAllIcons}
        >
          Download all
        </Button>
      </Stack>
    </Flex>
  )
};

export default Header;
