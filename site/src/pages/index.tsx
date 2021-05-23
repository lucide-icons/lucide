import Layout from "../components/Layout";
import { getAllData } from "../lib/icons";

import IconOverview from "../components/IconOverview";
import IconDetailOverlay from "../components/IconDetailOverlay";
import Router, { useRouter } from "next/router";
import Header from "../components/Header";
import { useEffect } from "react";

const IndexPage = ({ data }) => {
  const router = useRouter();
  const getIcon = (iconName) => data.find(({name}) => name === iconName) || {};

  useEffect(() => {
    router.events.on('routeChangeComplete',((url, options) => {
      console.log(router);
      console.log(getIcon(router.query.iconName));

    }))
  }, [])

  return (
    <Layout>
      <IconDetailOverlay
        open={!!router.query.iconName}
        icon={getIcon(router.query.iconName)}
        close={() => router.push('/')}
      />
      <Header {...{data}}/>
      <IconOverview {...{data}}/>
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
