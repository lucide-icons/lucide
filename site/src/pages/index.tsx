import { getAllData } from "../lib/icons";

const IndexPage = ({ data }) => {
  console.log(data);

  return <div></div>;
};

export async function getStaticProps() {
  let data = getAllData();
  return {
    props: {
      data,
    },
  };
}

export default IndexPage;
