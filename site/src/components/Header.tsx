import {
  Button,
  Flex,
  Stack,
  Text,
  Link,
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
      <Text fontSize="3xl" as="b" mb="4" textAlign="center">
        Simply beautiful open source icons, community-sourced
      </Text>
      <Text fontSize="lg" as="p" textAlign="center" mb="8">
        An open-source icon library, a fork of <Link href="https://github.com/feathericons/feather" isExternal>Feather Icons</Link>. <br/>We're expanding the icon set as much as possible while keeping it nice-looking - <Link href="https://github.com/lucide-icons/lucide" isExternal>join us</Link>!
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
