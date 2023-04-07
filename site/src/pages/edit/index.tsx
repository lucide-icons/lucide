import Layout from '../../components/Layout';
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import IconEditor from '../../components/IconEditor';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44"></path><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"></path><path d="M4 13.5V6a2 2 0 0 1 2-2h2"></path></svg>`;

const fetcher = ([url, body]) =>
  fetch(url, { method: 'POST', body }).then((res) =>
    res.status === 200 ? res.text() : Promise.reject()
  );

const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncing, setDebouncing] = useState(false);

  useEffect(() => {
    setDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncing(false);
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return [debouncedValue, debouncing] as const;
};

const swrOptions = {
  revalidateOnFocus: false,
};

const EditPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [src, setSrc] = useState(placeholderSvg);
  const [preview, setPreview] = useState<string | undefined>();
  const [debouncedSrc, debouncing] = useDebounce(src, 500);
  const formatted = useSWR(['/api/edit/format', debouncedSrc], fetcher, swrOptions);
  const optimized = useSWR(['/api/edit/optimize', debouncedSrc], fetcher, swrOptions);
  const disconnected = useSWR(['/api/edit/disconnect', debouncedSrc], fetcher, swrOptions);

  const urlData = router.asPath.split('?');
  useEffect(() => {
    if (urlData?.[1]) {
      setSrc(Buffer.from(urlData[1], 'base64').toString('utf8'));
    }
  }, [router.query]);

  const onSave = () => {
    const data = Buffer.from(src).toString('base64');
    const domain = window.location.origin;
    navigator.clipboard.writeText(`${domain}${urlData[0]}?${data}`);
    toast({
      title: 'Saved.',
      description: 'Link copied to clipboard.',
      status: 'success',
      isClosable: true,
      duration: 2000,
    });
    router.push(`/edit?${data}`);
  };

  return (
    <Layout>
      <Flex gap={6} direction="column">
        <Flex justifyContent="space-between" gap={8}>
          <Text fontSize="2xl" fontWeight="semi-bold" as="h1">
            Edit
          </Text>
          <Flex gap={2}>
            <Button
              variant="outline"
              isLoading={debouncing || formatted.isLoading}
              disabled={formatted.data === src}
              onClick={() => setSrc(formatted.data)}
              onMouseOver={() => setPreview(formatted.data)}
              onMouseOut={() => setPreview(undefined)}
            >
              Format
            </Button>
            <Button
              variant="outline"
              isLoading={debouncing || optimized.isLoading}
              disabled={optimized.data === src}
              onClick={() => setSrc(optimized.data)}
              onMouseOver={() => setPreview(optimized.data)}
              onMouseOut={() => setPreview(undefined)}
            >
              Optimize
            </Button>
            <Button
              variant="outline"
              isLoading={debouncing || disconnected.isLoading}
              disabled={disconnected.data === src}
              onClick={() => setSrc(disconnected.data)}
              onMouseOver={() => setPreview(disconnected.data)}
              onMouseOut={() => setPreview(undefined)}
            >
              Disconnect
            </Button>
            <Button colorScheme="green" onClick={onSave}>
              Save
            </Button>
          </Flex>
        </Flex>
        <IconEditor
          value={preview || src}
          onChange={(value) => {
            setSrc(value);
            setPreview(undefined);
          }}
        />
      </Flex>
    </Layout>
  );
};

export default EditPage;
