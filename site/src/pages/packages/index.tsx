import Layout from '../../components/Layout';
import { HeadingNavigationProvider } from '../../components/HeadingNavigationProvider';
import MobileMenu from '../../components/MobileMenu';
import { Stack } from '@chakra-ui/react';
import Package from '../../components/Package';

const PackagesPage = () => {
  return (
    <HeadingNavigationProvider>
      <MobileMenu />
      <Layout>
        <Stack spacing={8}>
          <Package />
        </Stack>
      </Layout>
    </HeadingNavigationProvider>
  );
};

export default PackagesPage;

// export async function getStaticProps({ params }) {
//   const allDocs = await fetchAllDocuments();
//   const doc = allDocs.find(({ filename = '' }) => filename === 'index.md');

//   return { props: doc };
// }
