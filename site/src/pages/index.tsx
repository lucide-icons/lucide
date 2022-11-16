import { Flex, Box, Divider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { getAllData } from '../lib/icons';

import IconOverview from '../components/IconOverview';
import IconDetailOverlay from '../components/IconDetailOverlay';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import { useMemo } from 'react';
import { GetStaticPropsResult, NextPage } from 'next';
import { IconEntity } from '../types';
import {SearchInput} from "../components/SearchInput";
import {PackageItem} from "../components/Package";
import fetchPackages from "../lib/fetchPackages";
import Section from "../components/Section";

interface HomePageProps {
  data: IconEntity[]
}

const HomePage: NextPage<HomePageProps> = ({ data, packages }) => {
  const router = useRouter();
  const getIcon = iconName => data.find(({ name }) => name === iconName);

  const currentIcon = useMemo(() => {
    return getIcon(router.query.iconName)
  }, [router.query])

  return (
    <Layout>
      <MobileMenu />
      <IconDetailOverlay
        open={!!currentIcon?.name}
        icon={currentIcon}
        close={() => router.push('/', undefined, { shallow: true })}
      />
      <Section variant="odd">
        <Header {...{ data }} />
      </Section>
      <Section variant="even" align="center">TODO: Why choose us?</Section>
      <Section variant="odd" align="center">TODO: Latest icons</Section>
      <Section variant="even" align="center">TODO: Customization options</Section>
      <Section variant="odd" align="center">TODO: Icon requests</Section>
      <Section variant="even" align="center">TODO: Bug reports</Section>
      <Section variant="odd" align="center">TODO?: Partners</Section>
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  const data = await getAllData();
  const packages: PackageItem[] = (await fetchPackages());

  return {
    props: {
      data,
      packages,
    },
  };
}

export default HomePage;
