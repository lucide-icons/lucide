import { Button, Flex, Link, WrapItem, Text, Wrap, Heading } from '@chakra-ui/react';
import download from 'downloadjs';
import JSZip from 'jszip';
import { Download, Github } from 'lucide-react';
import { IconCustomizerDrawer } from './IconCustomizerDrawer';

function generateZip(icons) {
  const zip = new JSZip();
  Object.values(icons).forEach(icon =>
    // @ts-ignore
    zip.file(`${icon.name}.svg`, icon.src),
  );
  return zip.generateAsync({ type: 'blob' });
}

const Header = ({ data }) => {
  const downloadAllIcons = async () => {
    const zip = await generateZip(data);
    download(zip, 'lucide.zip');
  };

  const repositoryUrl = 'https://github.com/lucide-icons/lucide';

  return (
    <Flex direction="column" align="center" justify="center">
      <Heading as="h1" fontSize="4xl" mb="4" textAlign="center">
        Simply beautiful open source icons, community-sourced
      </Heading>
      <Text fontSize="lg" as="p" textAlign="center" mb="8">
        An open-source icon library, a fork of{' '}
        <Link href="https://github.com/feathericons/feather" isExternal>
          Feather Icons
        </Link>
        . <br />
        We're expanding the icon set as much as possible while keeping it nice-looking -{' '}
        <Link href={repositoryUrl} isExternal>
          join us
        </Link>
        !
      </Text>
      <Wrap marginTop={3} marginBottom={12} spacing="15px" justify="center">
        <WrapItem>
          <Button leftIcon={<Download />} size="lg" onClick={downloadAllIcons}>
            Download all
          </Button>
        </WrapItem>
        <WrapItem>
          <IconCustomizerDrawer />
        </WrapItem>
        <WrapItem>
          <Button
            as="a"
            leftIcon={<Github />}
            size="lg"
            href={repositoryUrl}
            target="__blank"
            onClick={downloadAllIcons}
          >
            Github
          </Button>
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Header;
