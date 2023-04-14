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

export function getStaticProps() {
  // get data from headless CMS

  return {
    props: {
      title: "Product 1",
    },
  };
}

export default ProductPage;
