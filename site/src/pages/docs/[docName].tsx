import fetchAllDocuments from '../../lib/fetchAllDocuments';

export { default } from '.';

const transformToReadableSlug = (fileName: string) =>
  fileName
    .toLowerCase()
    .replace(/_/g, '-')
    .replace('.md', '');

export async function getStaticProps({ params: { docName } }) {
  const allDocs = await fetchAllDocuments();

  const doc = allDocs.find(({ filename = '' }) => transformToReadableSlug(filename) === docName);

  return { props: doc };
}

export async function getStaticPaths() {
  const docs = await fetchAllDocuments();

  const paths = docs
    .filter(({ filename = '' }) => filename !== 'index.md')
    .map(doc => ({
      params: {
        docName: transformToReadableSlug(doc.filename),
      },
    }));

  return {
    paths,
    fallback: false,
  };
}
