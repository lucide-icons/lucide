import Layout from '../components/Layout';
import Head from 'next/head';

import MobileMenu from '../components/MobileMenu';
import { Box, Heading, Text } from '@chakra-ui/react';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { GetStaticProps } from 'next';

const LicensePage = ({ licenseText }: { licenseText: string[] }): JSX.Element => {
  return (
    <Box>
      <MobileMenu />
      <Layout>
        <Head>
          <title>License - Lucide</title>
        </Head>

        <Box maxWidth="xl" width="100%" marginX="auto">
          <Heading as="h1" mb={4}>
            Lucide License
          </Heading>
          {licenseText.map((text, index) => {
            if (index === 0) {
              return (
                <Heading as="h2" fontSize={24} mb={8}>
                  {text}
                </Heading>
              );
            }

            return (
              <Text fontSize={19} mb={4}>
                {text}
              </Text>
            );
          })}
        </Box>
      </Layout>
    </Box>
  );
};

export default LicensePage;

export const getStaticProps: GetStaticProps = async () => {
  const doc: string = await fs.readFile(resolve('../LICENSE'), 'utf-8');

  const licenseText = doc
    .split(/\n{2,}/)
    .map(paragraph =>
      paragraph
        .split('\n')
        .join(' ')
        .trim(),
    )
    .filter(Boolean);

  return { props: { licenseText } };
};
