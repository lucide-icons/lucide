import Layout from '../../components/Layout';
import IconOverview from '../../components/IconOverview';
import { getAllData } from '../../lib/icons';
import { getAllCategories } from 'src/lib/categories';
import IconDetailOverlay from 'src/components/IconDetailOverlay';
import MobileMenu from "../../components/MobileMenu";

const IconsPage = ({ data, categories }) => {
  return (
    <Layout>
      <MobileMenu />
      <IconDetailOverlay categories={categories} />
      <IconOverview {...{ data, categories }} key="icon-overview" />
    </Layout>
  );
};

export default IconsPage;

export async function getStaticProps() {
  const data = await getAllData({ withChildKeys: true });
  const categories = await getAllCategories()

  return {
    props: {
      data,
      categories,
    },
  };
}
