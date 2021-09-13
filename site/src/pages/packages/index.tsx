import Layout from '../../components/Layout';
import { HeadingNavigationProvider } from '../../components/HeadingNavigationProvider';
import MobileMenu from '../../components/MobileMenu';
import { Stack } from '@chakra-ui/react';
import Package from '../../components/Package';
import packageData from '../../lib/packageData';
import { Heading } from '@chakra-ui/react';
import fetchPackages from '../../lib/fetchPackages';

const PackagesPage = ({ packages }) => {
  console.log(packages);

  return (
    <HeadingNavigationProvider>
      <MobileMenu />
      <Layout>
        <Heading as="h1" marginBottom={6} textAlign="center">
          Packages
        </Heading>
        <Stack spacing={8}>
          <Package shields={packageData['lucide-react'].shields} />
        </Stack>
      </Layout>
    </HeadingNavigationProvider>
  );
};

export default PackagesPage;

export async function getStaticProps({ params }) {
  const packages = await fetchPackages();

  return { props: { packages } };
}
