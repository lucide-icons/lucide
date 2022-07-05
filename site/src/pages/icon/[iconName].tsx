import { useMemo } from 'react';
import { useRouter } from 'next/router';
import IconDetailOverlay from '../../components/IconDetailOverlay';
import { getAllData, getData } from '../../lib/icons';
import IconOverview from '../../components/IconOverview';
import Layout from '../../components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';

const IconPage = ({ icon, data }): JSX.Element => {
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
        pathname: '/icons',
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
      <IconDetailOverlay key={currentIcon.name} icon={currentIcon} close={onClose} />
      <IconOverview {...{ data }} />
    </Layout>
  );
};

export default IconPage;

export const getStaticProps: GetStaticProps = async ({ params: { iconName } }) => {
  const data = await getAllData();
  const icon = await getData(iconName as string);
  return { props: { icon, data } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllData();

  return {
    paths: data.map(({ name: iconName }) => ({
      params: { iconName },
    })),
    fallback: false,
  };
};
