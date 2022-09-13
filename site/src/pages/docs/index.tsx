import Layout from '../../components/Layout';
import Head from 'next/head';
import fetchAllDocuments from '../../lib/fetchAllDocuments'
import { MDXRemote } from 'next-mdx-remote'
import mdxComponents from '../../lib/mdxComponents';
import HeadingNavigationProvider from '../../components/HeadingNavigationProvider';
import MobileMenu from '../../components/MobileMenu';
import DocsMenu from '../../components/DocsMenu';
import { Box, Button, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react'
import Link from 'next/link';

const DocPage = ({ doc, data }) => {
  if (!data || !doc) return null

  const nextPage = data.nextPage || []

  return (
    <HeadingNavigationProvider>
      <MobileMenu>
        <DocsMenu/>
      </MobileMenu>
      <Layout aside={
          <DocsMenu
            display={{ base:'none', md: 'block' }}
            paddingX={8}
            position="sticky"
            overflowY="auto"
            width={240}
            height="100vh"
            marginTop={-4}
            top={0}
          />
        }
      >
        { data?.title ? (
          <Head>
            <title>{ data.title }</title>
          </Head>
        ) : null}

        <Box maxWidth="xl" width='100%' marginX='auto'>
          <MDXRemote {...doc} data={data} components={mdxComponents} />

          { nextPage.map((page) => (
            <Link href={`docs/${page}`}>
              <Button
                variant="ghost"
                borderWidth="1px"
                rounded="lg"
                padding={8}
                position="relative"
                width='60%'
                minWidth={240}
                marginTop={6}
                rightIcon={<ArrowRight />}
                >
                  <Text fontSize={19} fontWeight="bold" textTransform="capitalize">
                    {page}
                  </Text>
              </Button>
            </Link>
          )) }
        </Box>
      </Layout>
    </HeadingNavigationProvider>
  )
}

export default DocPage

export async function getStaticProps() {
  const allDocs = await fetchAllDocuments();
  const doc = allDocs.find(({filename = ''}) => filename === 'index.md');

  return { props: doc }
}
