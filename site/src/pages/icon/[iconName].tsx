import { useRouter } from 'next/router'
import IconDetailOverlay from '../../components/IconDetailOverlay'
import { getAllData, getData } from '../../lib/icons';
import IconOverview from '../../components/IconOverview';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

const IconPage = ({ icon, data }) => {
  const router = useRouter()

  const onClose = () => {
    let query = {};

    if(router.query.search) {
      query = {
        search: router.query.search
      };
    }

    router.push({
      pathname: '/',
      query,
    })
  }

  return (
    <Layout>
      <IconDetailOverlay
        key={icon.name}
        icon={icon}
        onClose={onClose}
      />
      <Header {...{data}}/>
      <IconOverview {...{data}}/>
    </Layout>
  )
}

export default IconPage

export function getStaticProps({ params: { iconName } }) {
  const data = getAllData();
  const icon = getData(iconName);
  return { props: { icon, data } }
}

export function getStaticPaths() {
  return {
    paths: getAllData().map(({ name: iconName }) => ({
      params: { iconName },
    })),
    fallback: false,
  }
}
