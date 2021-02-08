import Layout from "../components/Layout";
import { getAllData } from "../lib/icons";

import IconOverview from "../components/IconOverview";
import IconDetailOverlay from "../components/IconDetailOverlay";
import { useRouter } from "next/router";
import Header from "../components/Header";
import {CustomizeIconContext} from "../components/CustomizeIconContext";

const IndexPage = ({ data }) => {
  const router = useRouter();
  const getIcon = (iconName) => data.find(({name}) => name === iconName) || {};

  return (
    <Layout>
      <CustomizeIconContext>
        <IconDetailOverlay
          isOpen={!!router.query.iconName}
          icon={getIcon(router.query.iconName)}
          onClose={() => router.push('/')}
        />
        <Header {...{data}}/>
        <IconOverview {...{data}}/>
      </CustomizeIconContext>
    </Layout>
  );
};

export async function getStaticProps() {
  let data = await getAllData();

  return {
    props: {
      data,
    },
  };
}

export default IndexPage;
