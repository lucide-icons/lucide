import Layout from '../../components/Layout';
import {getAllData} from '../../lib/icons';

import IconOverview from '../../components/IconOverview';
import IconDetailOverlay from '../../components/IconDetailOverlay';
import {useRouter} from 'next/router';
import MobileMenu from '../../components/MobileMenu';
import {useMemo} from 'react';
import {GetStaticPropsResult, NextPage} from 'next';
import {IconEntity} from '../../types';

interface IconIndexProps {
  data: IconEntity[]
}

const IconIndex: NextPage<IconIndexProps> = ({data, packages}) => {
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
      <IconOverview {...{currentIcon, data}} />

      {/*<Wrap marginTop={3} marginBottom={12} spacing="15px" justify="center">*/}
      {/*  <WrapItem>*/}
      {/*    <Button*/}
      {/*      leftIcon={<Download />}*/}
      {/*      size="lg"*/}
      {/*      onClick={downloadAllIcons}*/}
      {/*      isLoading={zippingIcons}*/}
      {/*      loadingText="Creating zip.."*/}
      {/*    >*/}
      {/*      Download all*/}
      {/*    </Button>*/}
      {/*  </WrapItem>*/}
      {/*  <WrapItem>*/}
      {/*    <IconCustomizerDrawer />*/}
      {/*  </WrapItem>*/}
      {/*  <WrapItem>*/}
      {/*    <Button*/}
      {/*      as="a"*/}
      {/*      leftIcon={<Github />}*/}
      {/*      size="lg"*/}
      {/*      href={repositoryUrl}*/}
      {/*      target="__blank"*/}
      {/*    >*/}
      {/*      Github*/}
      {/*    </Button>*/}
      {/*  </WrapItem>*/}
      {/*</Wrap>*/}
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IconIndexProps>> {
  const data = await getAllData();

  return {
    props: {
      data,
    },
  };
}

export default IconIndex;
