import Layout from '../components/Layout';
import { getAllData } from '../lib/icons';

import IconOverview from '../components/IconOverview';
import IconDetailOverlay from '../components/IconDetailOverlay';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import { useMemo } from 'react';
import { GetStaticPropsResult, NextPage } from 'next';
import { IconEntity, Category } from '../types';
import { getAllCategories } from 'src/lib/categories';

interface HomePageProps {
  data: IconEntity[]
  categories: Category[]
}

const HomePage: NextPage<HomePageProps> = ({ data, categories }) => {
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
        close={() => router.push({
          pathname: '/icon/[iconName]',
          query: {
            ...router.query,
            iconName: '',
          },
        }, undefined, { shallow: true })}
      />
      <Header {...{ data }} />
      <IconOverview {...{ data, categories }} />
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  const data = await getAllData({ withChildKeys: true });
  const categories = await getAllCategories()

  return {
    props: {
      data,
      categories,
    },
  };
}

export default HomePage;
