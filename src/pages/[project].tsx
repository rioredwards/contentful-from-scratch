import { GetStaticPropsContext } from "next";
import { Project } from "./types";
import Image from "next/image";

const Project = ({ project }: { project: Project }) => {
  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <Image
        src={project.image.url}
        alt={project.image.title}
        width={200}
        height={200}
      />
    </div>
  );
};

export async function getStaticProps({ params }: GetStaticPropsContext<any>) {
  const { project } = params;

  // Fetch data from Contentful
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
          query GetProject($slug: String!) {
            projectCollection(
              where: {
              slug: $slug
            }, 
            limit: 1
            ) {
              items {
                title
                description
                image {
                  title
                  url
                  width
                  height
                }
              }
            }
          }
        `,
        variables: {
          slug: project,
        },
      }),
    }
  );

  if (!response.ok) {
    console.error("Error Fetching Data: ", response);
    return {};
  }

  const { data } = await response.json();
  const [projectData] = data.projectCollection.items as any;
  console.log("projectData: ", projectData);

  return {
    props: {
      project: projectData,
    },
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
