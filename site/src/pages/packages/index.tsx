import Layout from '../../components/Layout';
import HeadingNavigationProvider from '../../components/HeadingNavigationProvider';
import MobileMenu from '../../components/MobileMenu';
import {Heading, Stack} from '@chakra-ui/react';
import Package, {PackageItem} from '../../components/Package';
import packagesData from '../../data/packageData.json';
import thirdPartyPackagesData from '../../data/packageData.thirdParty.json';
import fetchPackages from '../../lib/fetchPackages';
import {GetStaticPropsResult} from 'next';
import Section from "../../components/Section";

interface PackagesPageProps {
  packages: PackageItem[]
  thirdPartyPackages: PackageItem[]
}

const PackagesPage = ({packages, thirdPartyPackages}: PackagesPageProps): JSX.Element => {
  return (
    <HeadingNavigationProvider>
      <MobileMenu/>
      <Layout>
        <Section variant="even">
          <Heading as="h1" marginBottom={6} textAlign="center">
            Packages
          </Heading>
          <Stack spacing={8} align="center">
            {packages.length
              ? packages.map((packageItem) => <Package key={packageItem.name} {...packageItem} />)
              : null}
          </Stack>

          <Heading as="h1" marginBottom={6} marginTop={12} textAlign="center">
            Third party packages
          </Heading>
          <Stack spacing={8} marginBottom={6} align="center">
            {thirdPartyPackages.length
              ? thirdPartyPackages.map((packageItem) => (
                <Package key={packageItem.name} thirdParty={true} {...packageItem} />))
              : null}
          </Stack>
        </Section>
      </Layout>
    </HeadingNavigationProvider>
  );
};

export default PackagesPage;

export async function getStaticProps(): Promise<GetStaticPropsResult<PackagesPageProps>> {
  const packages: PackageItem[] = (await fetchPackages())
    .filter(Boolean)
    .filter(packageObj => !packageObj.private && packageObj.name in packagesData)
    .map(({name, description, flutter}) => {
      const packageDirectory = flutter ? 'lucide-flutter' : name;

      return {
        name,
        description,
        source: `https://github.com/lucide-icons/lucide/tree/main/packages/${packageDirectory}`,
        documentation: `/docs/${packageDirectory}`,
        ...packagesData[packageDirectory],
        icon: `/framework-logos/${packagesData[packageDirectory].icon}.svg`,
      };
    })
    .sort((a, b) => a.order - b.order);

  return {props: {packages, thirdPartyPackages: thirdPartyPackagesData}};
}
