import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const EXERCISE = gql`
  query exercise($id: String!) {
    exercise(id: $id) {
      name
      id
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(EXERCISE, { variables: { id } });

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
