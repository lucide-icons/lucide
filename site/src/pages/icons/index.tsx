import Layout from '../../components/Layout';
import IconOverview from '../../components/IconOverview';
import { getAllData } from '../../lib/icons';

const IconsPage = ({ data }) => {
  return (
    <Layout>
      <IconOverview {...{ data }} />
    </Layout>
  );
};

export default IconsPage;

export async function getStaticProps() {
  const data = await getAllData();

  return {
    props: {
      data,
    },
  };
}
