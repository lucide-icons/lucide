import Layout from '../../components/Layout';
import { Link, Badge, Button, Flex, Text, useToast } from '@chakra-ui/react';
import download from 'downloadjs';
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
  // const snapped = useSWR(['/api/edit/snap', debouncedSrc], fetcher, swrOptions);
  const volume = useSWR(['/api/edit/volume', debouncedSrc], fetcher, swrOptions);

  const [user, repository, name, ...branchSegments] =
    typeof router.query.path === 'string' ? [] : router.query.path || [];
  const branch = branchSegments.join?.('/') || undefined;

  const urlData = router.asPath.split('?');
  const urlSrc = urlData[1] && Buffer.from(urlData[1], 'base64').toString('utf8');
  useEffect(() => {
    if (urlData?.[1]) {
      setSrc(urlSrc);
    }
  }, [urlData?.[1]]);

  const data = Buffer.from(formatted.data || src).toString('base64');

  const onSave = () => {
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

  const onDownload = () => {
    download(src, `${name || 'icon'}.svg`, 'image/svg+xml');
  };

  return (
    <Layout keyBindings={{ s: { ctrl: true, fn: onSave } }}>
      <Flex gap={6} marginTop={-6} direction="column">
        <Flex justifyContent="space-between" gap={8}>
          <Text fontSize="2xl" fontWeight="semi-bold" as="h1" display="flex" gap={2}>
            {name && user && repository ? (
              <>
                <span dangerouslySetInnerHTML={{ __html: formatted.data }} />
                <Text textTransform="capitalize">{name}</Text>
                <Text fontSize="xs">
                  from{' '}
                  <Badge
                    as={Link}
                    fontSize="inherit"
                    textTransform="inherit"
                    colorScheme="blue"
                    target="_blank"
                    href={`https://github.com/${user}/${repository}/blob/${
                      branch || 'main'
                    }/icons/${name}.svg`}
                  >
                    {user}/{repository}
                    {branch ? `:${branch}` : null}
                  </Badge>
                </Text>
              </>
            ) : (
              <>
                <span dangerouslySetInnerHTML={{ __html: formatted.data }} />
                Playground
              </>
            )}
          </Text>
          <Flex gap={2} direction="column">
            <Flex justifyContent="end" minHeight="18px">
              {volume.data && parseFloat(volume.data) < 225 ? (
                <Badge colorScheme="orange">Icon might be a bit small</Badge>
              ) : volume.data && parseFloat(volume.data) > 350 ? (
                <Badge colorScheme="red">Icon is quite big, compared to square and circle</Badge>
              ) : null}
            </Flex>
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
                Optimize{' '}
                {Math.round((1 - formatted.data?.length / optimized.data?.length) * 1000) / 10 +
                  '%'}
              </Button>
              {/*
              <Button
                variant="outline"
                isLoading={debouncing || snapped.isLoading}
                disabled={snapped.data === src}
                onClick={() => setSrc(snapped.data)}
                onMouseOver={() => setPreview(snapped.data)}
                onMouseOut={() => setPreview(undefined)}
              >
                Snap
              </Button>
              */}
              <Button onClick={onDownload}>Download</Button>
              <Button colorScheme={src === urlSrc ? undefined : 'green'} onClick={onSave}>
                Save
              </Button>
            </Flex>
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
