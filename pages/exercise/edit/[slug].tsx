import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const EXERCISE = gql`
  query exercise($slug: String!) {
    exercise(slug: $slug) {
      name
      slug
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading } = useQuery(EXERCISE, { variables: { slug } });

  if (loading) return <p>Loading</p>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <h1>{data.exercise.name}</h1>
    </div>
  );
}
