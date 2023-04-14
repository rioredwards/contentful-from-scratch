import { client } from "../services/contentful";

interface ProductPageProps {
  title: string;
}

const ProductPage: React.FC<ProductPageProps> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

export async function getStaticProps() {
  // get data from headless CMS

  // Get multiple entries
  // client
  //   .getEntries()
  //   .then((response) => console.log(response.items))
  //   .catch(console.error);

  // Get single entry

  const response = await client.getEntry("5SRnbc7bvkJdCeJD6o2avt");
  console.log(response.fields);

  return {
    props: {
      title: response.fields.heading,
    },
  };
}

export default ProductPage;
