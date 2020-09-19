import { useEffect } from 'react'
import { useRouter } from 'next/router'
import IconDetailOverlay from '../../components/IconDetailOverlay'
import { getAllData, getData } from '../../lib/icons';

const IconPage = ({ icon }) => {
  const router = useRouter()

  useEffect(() => {
    // router.prefetch('/')
    // router.replace('/').then(() => router.query.iconName = icon.name)
    router.replace({
      pathname: '/',
      as: `/icon/${icon.name}`,
      query: { iconName: icon.name },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    
    <>
      <IconDetailOverlay
        icon={icon}
        onClose={() => router.push('/')}
      />
    </>
  )
}

export default IconPage

export function getStaticProps({ params: { iconName } }) {
  const icon = getData(iconName);
  return { props: { icon } }
}

export function getStaticPaths() {
  return {
    paths: getAllData().map(({name: iconName }) => ({
      params: { iconName },
    })),
    fallback: false,
  }
}
