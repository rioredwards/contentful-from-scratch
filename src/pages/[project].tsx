import { GetStaticProps } from "next";
const Project = () => {
  return <div>Project</div>;
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query {
          projectCollection {
            items {
              slug
            }
          }
        }
        `,
      }),
    }
  );

  if (!response.ok) {
    console.error("Error Fetching Data: ", response);
  }

  const data = await response.json();
  const projects = data.data.projectCollection.items;
  const paths = projects.map((project: any) => {
    return { params: { project: project.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export default Project;
