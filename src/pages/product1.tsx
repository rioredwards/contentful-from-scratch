import { client } from "../services/contentful";

interface ProductPageProps {
  heading: string;
  subheading: string;
}

const ProductPage: React.FC<ProductPageProps> = (props) => {
  return (
    <div>
      <h1>{props.heading}</h1>
      <h2>{props.subheading}</h2>
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
      heading: response.fields.heading,
      subheading: response.fields.subheading,
    },
  };
}

export default ProductPage;
