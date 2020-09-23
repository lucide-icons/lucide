import { useEffect } from 'react'
import { useRouter } from 'next/router'
import IconDetailOverlay from '../../components/IconDetailOverlay'
import { getAllData, getData } from '../../lib/icons';
import IconOverview from '../../components/IconOverview';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

const IconPage = ({ icon, data }) => {
  const router = useRouter()

  // useEffect(() => {
  //   // router.prefetch('/')
  //   // router.replace('/').then(() => router.query.iconName = icon.name)
  //   router.replace({
  //     pathname: '/',
  //     as: `/icon/${icon.name}`,
  //     query: { iconName: icon.name },
  //   })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <Layout>
      <IconDetailOverlay
        icon={icon}
        onClose={() => router.push('/')}
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
    paths: getAllData().map(({name: iconName }) => ({
      params: { iconName },
    })),
    fallback: false,
  }
}
