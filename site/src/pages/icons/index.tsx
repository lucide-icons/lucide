import Layout from '../../components/Layout';
import {getAllData} from '../../lib/icons';

import IconOverview from '../../components/IconOverview';
import IconDetailOverlay from '../../components/IconDetailOverlay';
import {useRouter} from 'next/router';
import MobileMenu from '../../components/MobileMenu';
import {useMemo} from 'react';
import {GetStaticPropsResult, NextPage} from 'next';
import {CategoryEntity, IconEntity} from '../../types';
import {fetchCurrentRelease} from "../../lib/fetchAllReleases";
import {getAllCategories} from "../../lib/categories";

interface IconIndexProps {
  data: IconEntity[];
  categories: CategoryEntity[];
}

const IconIndex: NextPage<IconIndexProps> = ({data, categories, currentVersion}) => {
  const router = useRouter();
  const getIcon = iconName => data.find(({name}) => name === iconName);

  const currentIcon = useMemo(() => {
    return getIcon(router.query.iconName)
  }, [router.query])

  return (
    <Layout>
      <MobileMenu/>
      <IconDetailOverlay
        open={!!currentIcon?.name}
        icon={currentIcon}
        close={() => router.push('/', undefined, {shallow: true})}
      />
      <IconOverview {...{currentIcon, data, categories, currentVersion}} />
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IconIndexProps>> {
  const data = await getAllData();
  const categories = await getAllCategories();
  const currentVersion = await fetchCurrentRelease();

  return {
    props: {
      data,
      categories,
      currentVersion,
    },
  };
}

export default IconIndex;
