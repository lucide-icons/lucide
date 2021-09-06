import { useRouter } from 'next/router';
import IconDetailOverlay from '../../components/IconDetailOverlay';
import { getAllData, getData } from '../../lib/icons';
import IconOverview from '../../components/IconOverview';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

const IconPage = ({ icon, data }) => {
  const router = useRouter();

  const onClose = () => {
    let query = {};

    if (router.query.search) {
      query = {
        search: router.query.search,
      };
    }
    console.log('CLOSE');

    router.push(
      {
        pathname: '/',
        query,
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <Layout>
      <IconDetailOverlay key={icon.name} icon={icon} close={onClose} />
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
