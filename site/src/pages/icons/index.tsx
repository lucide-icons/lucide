import Layout from '../../components/Layout';
import IconOverview from '../../components/IconOverview';
import { getAllData } from '../../lib/icons';
import { getAllCategories } from 'src/lib/categories';

const IconsPage = ({ data, categories }) => {
  return (
    <Layout>
      <IconOverview {...{ data, categories }} />
    </Layout>
  );
};

export default IconsPage;

export async function getStaticProps() {
  const data = await getAllData();
  const categories = await getAllCategories()

  return {
    props: {
      data,
      categories,
    },
  };
}
