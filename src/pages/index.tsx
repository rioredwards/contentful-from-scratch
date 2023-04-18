import Image from "next/image";
import Link from "next/link";
import { Project } from "./types";

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <main className="flex flex-col w-full">
      <h1 className="text-center">Projects</h1>
      <div className="w-2/3 mx-auto">
        <ul>
          {projects.map((project, idx) => (
            <li key={idx}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <Link href={`/${project.slug}`}>
                <Image
                  src={project.image.url}
                  alt={project.image.title}
                  width={200}
                  height={200}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export async function getStaticProps() {
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
        query {
          projectCollection {
            items {
              title
              slug
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
      }),
    }
  );

  if (!response.ok) {
    console.error("Error Fetching Data: ", response);
  }

  const { data } = await response.json();
  const projects = data.projectCollection.items as Project[];
  console.log("projects: ", projects);

  return {
    props: {
      projects: projects,
    },
  };
}
