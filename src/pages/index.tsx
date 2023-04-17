interface Project {
  title: string;
  description: string;
  image: string;
}

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <main>
      <h1>Projects</h1>
      <pre>{JSON.stringify(projects)}</pre>
    </main>
  );
}

export async function getStaticProps() {
  // Fetch data from Contentful

  return {
    props: {
      projects: [
        {
          title: "Project 1",
          description: "Description 1",
          image: "https://via.placeholder.com/150",
        },
      ],
    },
  };
}
