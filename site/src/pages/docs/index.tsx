import Layout from '../../components/Layout';
import Head from 'next/head';
import fetchAllDocuments from '../../lib/fetchAllDocuments'
import { MDXRemote } from 'next-mdx-remote'
import mdxComponents from '../../lib/mdxComponents';



const DocPage = ({ doc, data, content }) => {
  console.log(doc, data, content);

  if (!data || !doc) return null

  return (
    <Layout>
      { data?.title ? (
        <Head>
          <title>{ data.title }</title>
        </Head>
      ) : null }
      <MDXRemote {...doc} components={mdxComponents} />
    </Layout>
  )
}

export default DocPage

export async function getStaticProps({ params }) {
  const allDocs = await fetchAllDocuments();
  const doc = allDocs.find(({filename = ''}) => filename === 'index.md');

  return { props: doc }
}
