interface Project {
  title: string;
  description: string;
  image: string;
}

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <main>
      <h1>Projects</h1>
      <div className="space-y-4">
        <pre className="w-96 whitespace-pre-wrap">
          {JSON.stringify(projects)}
        </pre>
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
          # add your query
          projectCollection {
            items {
              title
              description
              image {
                title
                url
                width
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

  const data = await response.json();
  const projects = data.data.projectCollection.items;

  return {
    props: {
      projects: [projects],
    },
  };
}
