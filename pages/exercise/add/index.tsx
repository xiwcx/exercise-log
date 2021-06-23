import { useCallback } from "react";
import Head from "next/head";
import { FormExercise } from "../../../components/form-exercise";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const ADD_EXERCISE = gql`
  mutation CreateExercise($name: String!) {
    createExercise(name: $name) {
      id
      name
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const [addExercise, { data, loading }] = useMutation(ADD_EXERCISE, {
    onCompleted() {
      router.push("/exercise");
    },
  });

  const memoizedAddExercise = useCallback(
    (data) => addExercise({ variables: data }),
    [addExercise]
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <h1>Add Exercise</h1>

      <FormExercise loading={loading} onSubmit={memoizedAddExercise} />
    </div>
  );
}
