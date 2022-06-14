import Layout from '../../components/Layout';
import HeadingNavigationProvider from '../../components/HeadingNavigationProvider';
import MobileMenu from '../../components/MobileMenu';
import { Stack } from '@chakra-ui/react';
import Package from '../../components/Package';
import packagesData from '../../lib/packageData';
import { Heading } from '@chakra-ui/react';
import fetchPackages from '../../lib/fetchPackages';

const PackagesPage = ({ packages }) => {
  return (
    <HeadingNavigationProvider>
      <MobileMenu />
      <Layout>
        <Heading as="h1" marginBottom={6} textAlign="center">
          Packages
        </Heading>
        <Stack spacing={8} align="center">
          {packages.length ? packages.map(packageItem => <Package {...packageItem} />) : null}
        </Stack>
      </Layout>
    </HeadingNavigationProvider>
  );
};

export default PackagesPage;

export async function getStaticProps({ params }) {
  const packages = (await fetchPackages())
    .filter(Boolean)
    .filter(packageObj => !packageObj.private && packageObj.name in packagesData)
    .map(({ name, description, flutter = false }) => {
      const packageDirectory = flutter ? 'lucide-flutter' : name;

      return {
        name,
        description,
        image: `/package-logos/${packageDirectory}-small.svg`,
        source: `https://github.com/lucide-icons/lucide/tree/master/packages/${packageDirectory}`,
        documentation: `/docs/${packageDirectory}`,
        ...packagesData[packageDirectory],
      };
    })
    .sort((a, b) => a.order - b.order);

  return { props: { packages } };
}
