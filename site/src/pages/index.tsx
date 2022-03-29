import Layout from '../components/Layout';
import { getAllData } from '../lib/icons';

import IconOverview from '../components/IconOverview';
import IconDetailOverlay from '../components/IconDetailOverlay';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import { useEffect, useMemo } from 'react';

const IndexPage = ({ data }) => {
  const router = useRouter();
  const getIcon = iconName => data.find(({ name }) => name === iconName) || {};

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
      <Header {...{ data }} />
      <IconOverview {...{ data }} />
    </Layout>
  );
};

export async function getStaticProps() {
  const data = await getAllData();

  return {
    props: {
      data,
    },
  };
}

export default IndexPage;
