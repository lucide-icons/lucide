import Layout from '../../components/Layout';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import IconEditor from '../../components/IconEditor';
import useSWR from 'swr';

const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44"></path><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"></path><path d="M4 13.5V6a2 2 0 0 1 2-2h2"></path></svg>`;

const fetcher = ([url, body]) =>
  fetch(url, { method: 'POST', body }).then((res) =>
    res.status === 200 ? res.text() : Promise.reject()
  );

const EditPage = () => {
  const [src, setSrc] = useState(placeholderSvg);
  const [preview, setPreview] = useState<string | undefined>();
  const formatted = useSWR(['/api/edit/format', src], fetcher);
  const optimized = useSWR(['/api/edit/optimize', src], fetcher);
  const disconnected = useSWR(['/api/edit/disconnect', src], fetcher);

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
              isLoading={formatted.isLoading}
              disabled={formatted.data === src}
              onClick={() => setSrc(formatted.data)}
              onMouseOver={() => setPreview(formatted.data)}
              onMouseOut={() => setPreview(undefined)}
            >
              Format
            </Button>
            <Button
              variant="outline"
              isLoading={optimized.isLoading}
              disabled={optimized.data === src}
              onClick={() => setSrc(optimized.data)}
              onMouseOver={() => setPreview(optimized.data)}
              onMouseOut={() => setPreview(undefined)}
            >
              Optimize
            </Button>
            <Button
              variant="outline"
              isLoading={disconnected.isLoading}
              disabled={disconnected.data === src}
              onClick={() => setSrc(disconnected.data)}
              onMouseOver={() => setPreview(disconnected.data)}
              onMouseOut={() => setPreview(undefined)}
            >
              Disconnect
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
