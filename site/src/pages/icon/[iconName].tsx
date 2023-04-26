import { useMemo } from 'react';
import { useRouter } from 'next/router';
import IconDetailOverlay from '../../components/IconDetailOverlay';
import { getAllData, getData } from '../../lib/icons';
import IconOverview from '../../components/IconOverview';
import Layout from '../../components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllCategories } from 'src/lib/categories';

const IconPage = ({ icon, data, categories }): JSX.Element => {
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
      { scroll: false, shallow: true },
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
      <IconOverview {...{ data, categories }} key="icon-overview" />
    </Layout>
  );
};

export default IconPage;

export const getStaticProps: GetStaticProps = async ({ params: { iconName } }) => {
  const data = await getAllData({ withChildKeys: true });
  const icon = await getData(iconName as string, { withChildKeys: true });
  const categories = await getAllCategories()

  return { props: { icon, data, categories } };
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
