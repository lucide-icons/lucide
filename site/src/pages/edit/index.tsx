import Layout from '../../components/Layout';
import { Badge, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import IconEditor from '../../components/IconEditor';
import useSWR from 'swr';
import { useRouter } from 'next/router';

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
  const [src, setSrc] = useState('');
  const [preview, setPreview] = useState<string | undefined>();
  const [debouncedSrc, debouncing] = useDebounce(src, 500);
  const formatted = useSWR(['/api/edit/format', debouncedSrc], fetcher, swrOptions);
  const optimized = useSWR(['/api/edit/optimize', debouncedSrc], fetcher, swrOptions);
  const disconnected = useSWR(['/api/edit/disconnect', debouncedSrc], fetcher, swrOptions);

  const [user, repository, name] = router.query.path || [];
  const branch = router?.query?.path?.slice?.(3)?.join?.('/') || undefined;

  const urlData = router.asPath.split('?');
  useEffect(() => {
    if (urlData?.[1]) {
      setSrc(Buffer.from(urlData[1], 'base64').toString('utf8'));
    }
  }, [urlData?.[1]]);

  const onSave = () => {
    const data = Buffer.from(formatted.data || src).toString('base64');
    if (formatted.data) setSrc(formatted.data);
    const domain = window.location.origin;
    navigator.clipboard.writeText(`${domain}${urlData[0]}?${data}`);
    toast({
      title: 'Saved.',
      description: 'Link copied to clipboard.',
      status: 'success',
      isClosable: true,
      duration: 2000,
    });
    router.push(`${urlData[0]}?${data}`);
  };

  return (
    <Layout keyBindings={{ s: { ctrl: true, fn: onSave } }}>
      <Flex gap={6} direction="column">
        <Flex justifyContent="space-between" gap={8}>
          <Text fontSize="2xl" fontWeight="semi-bold" as="h1">
            {name && user && repository ? (
              <>
                <Text textTransform="capitalize">{name}</Text>
                <Text fontSize="xs">
                  from{' '}
                  <Badge fontSize="inherit" textTransform="inherit" colorScheme="blue">
                    {user}/{repository}
                    {branch ? `:${branch}` : null}
                  </Badge>
                </Text>
              </>
            ) : (
              'Playground'
            )}
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
