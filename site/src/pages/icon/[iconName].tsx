import { useRouter } from 'next/router';
import IconDetailOverlay from '../../components/IconDetailOverlay';
import { getAllData, getData } from '../../lib/icons';
import IconOverview from '../../components/IconOverview';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { useMemo } from 'react';

const IconPage = ({ icon, data }) => {
  const router = useRouter();
  const getIcon = iconName => data.find(({ name }) => name === iconName) || {};

  const onClose = () => {
    let query = {};

    if (router.query.search) {
      query = {
        search: router.query.search,
      };
    }

    router.push(
      {
        pathname: '/',
        query,
      },
      undefined,
      { scroll: false },
    );
  };

  const currentIcon = useMemo(() => {
    if (icon.name === router.query.iconName) {
      return icon;
    }
    return getIcon(router.query.iconName);
  }, [router.query]);

  return (
    <Layout>
      <IconDetailOverlay key={currentIcon.name} icon={currentIcon} close={onClose} open />
      <Header {...{ data }} />
      <IconOverview {...{ data }} />
    </Layout>
  );
};

export default IconPage;

export async function getStaticProps({ params: { iconName } }) {
  const data = await getAllData();
  const icon = await getData(iconName);
  return { props: { icon, data } };
}

export async function getStaticPaths() {
  const data = await getAllData();

  return {
    paths: data.map(({ name: iconName }) => ({
      params: { iconName },
    })),
    fallback: false,
  };
}
