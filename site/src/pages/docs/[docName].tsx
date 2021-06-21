import Layout from '../../components/Layout';
import Header from '../../components/Header';
import fetchAllDocuments from '../../lib/fetchAllDocuments'

const DocPage = ({ document }) => {
  return (
    <div>
      hlaas
    </div>
  )
}

export default DocPage

export async function getStaticProps({ params: { docName } }) {
  const doc = fetchAllDocuments()
  return { props: { doc } }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          docName: 'introduction'
        }
      }
    ],
    fallback: false,
  }
}
