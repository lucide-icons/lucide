import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Head from 'next/head';
import fetchAllDocuments from '../../lib/fetchAllDocuments'

export { default } from '.'

export async function getStaticProps({ params: { docName } }) {
  const allDocs = await fetchAllDocuments()
  const doc = allDocs.find(({filename = ''}) => filename.includes(docName));
  return { props: doc }
}

export async function getStaticPaths() {
  const docs = await fetchAllDocuments()

  const paths =
    docs
      .filter(({filename = ''}) => filename !== 'index.md')
      .map(doc => ({
        params: {
          docName: doc.filename.replace('.md', '')
        }
      }))

  return {
    paths,
    fallback: false,
  }
}
