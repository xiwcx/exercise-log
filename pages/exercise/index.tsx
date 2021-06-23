import Head from "next/head";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const ADD_EXERCISE = gql`
  query allExercises {
    allExercises {
      name
      id
    }
  }
`;

type Exercise = {
  id: string;
  name: string;
};

export default function Exercise() {
  const { loading, error, data } = useQuery(ADD_EXERCISE);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <h1>Exercises</h1>

      <Link href="/exercise/add">
        <a>Add Exercise</a>
      </Link>

      {loading && <p>Loading</p>}

      {data && (
        <ul>
          {data.allExercises.map((exercise: Exercise) => (
            <li key={exercise.id}>
              {exercise.name}{" "}
              <Link href={`/exercise/edit/${exercise.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
