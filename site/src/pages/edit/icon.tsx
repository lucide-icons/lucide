import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  InputRightAddon,
  InputGroup,
  Flex,
  Heading,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { ExternalLink, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IconEditor from 'src/components/IconEditor';
import format from 'src/components/IconEditor/format';
import Layout from '../../components/Layout';

const defaultSrc = format('');

const SaveDialog = ({
  isOpen,
  onClose,
  src,
}: {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}) => {
  const [fileName, setFileName] = useState('');
  const fileNameForGitHub = fileName.replace(/-$/, '') + '.svg';
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent marginX={2} marginTop={12}>
        <ModalHeader>Choose file name</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <Input
              required
              isInvalid={!fileName}
              placeholder="file-name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value.toLowerCase().replace(/[^a-z]+/gi, '-'))}
              onBlur={() => setFileName((fileName) => fileName.replace(/-$/, ''))}
            />
            <InputRightAddon children=".svg" />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            as="a"
            colorScheme="green"
            leftIcon={<ExternalLink />}
            disabled={!fileName}
            target="_blank"
            href={`https://github.com/lucide-icons/lucide/new/main/icons?filename=${fileNameForGitHub}&value=${encodeURIComponent(
              src
            )}`}
          >
            Open GitHub
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const EditPage = () => {
  const router = useRouter();
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [src, setSrc] = useState(defaultSrc);

  const urlData = router.asPath.split('?');
  const urlSrc = urlData[1] && Buffer.from(urlData[1], 'base64').toString('utf8');

  const onChange = (value: string) => {
    router.push(`${urlData[0]}?${Buffer.from(value).toString('base64')}`);
    setSrc(value);
  };

  useEffect(() => {
    if (urlSrc && document.activeElement.tagName !== 'TEXTAREA') {
      setSrc(urlSrc);
    }
  }, [urlSrc]);

  useEffect(() => {
    const callback = (e: ClipboardEvent) => {
      const data = e.clipboardData.getData('text');
      if (data && document.activeElement.tagName !== 'TEXTAREA') {
        setSrc((src) => {
          const value = format(src.replace('</svg>', data.replace(/<svg[^>]*>/, '')));
          router.push(`${urlData[0]}?${Buffer.from(value).toString('base64')}`);
          return value;
        });
      }
    };
    addEventListener('paste', callback);
    return () => removeEventListener('paste', callback);
  }, []);

  return (
    <Layout
      maxWidth="1600px"
      keyBindings={{
        z: {
          ctrl: true,
          fn: (e) => {
            if (document.activeElement.tagName !== 'TEXTAREA') {
              if (e.shiftKey) window.history.forward();
              else window.history.back();
            }
          },
        },
        y: {
          ctrl: true,
          fn: () => {
            if (document.activeElement.tagName !== 'TEXTAREA') {
              window.history.forward();
            }
          },
        },
        s: {
          ctrl: true,
          fn: () => {
            setIsSaveDialogOpen(true);
          },
        },
      }}
    >
      <SaveDialog
        src={src}
        isOpen={isSaveDialogOpen}
        onClose={() => {
          setIsSaveDialogOpen(false);
        }}
      />
      <Flex padding={8}>
        <IconEditor
          heading={
            <Heading as="h1" size="md">
              Contribute
            </Heading>
          }
          defaultValue={defaultSrc}
          value={src}
          onChange={onChange}
          actions={[
            <Tooltip label="Reset" placement="top">
              <IconButton
                display={src === defaultSrc ? 'none' : undefined}
                aria-label="Reset"
                icon={<RotateCcw />}
                onClick={() => onChange(defaultSrc)}
              />
            </Tooltip>,
            <Button
              colorScheme={src.trim() && src !== defaultSrc ? 'green' : undefined}
              disabled={!src.trim() || src === defaultSrc}
              onClick={() => setIsSaveDialogOpen(true)}
            >
              Submit
            </Button>,
          ]}
        />
      </Flex>
    </Layout>
  );
};

export default EditPage;
