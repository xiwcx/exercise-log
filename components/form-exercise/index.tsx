import { useForm, SubmitHandler } from "react-hook-form";

type Exercise = {
  name: string;
};

type FormExerciseProps = {
  onSubmit: (data: Exercise) => void;
  loading: boolean;
};

type FormExerciseValues = {
  name: string;
};

export function FormExercise({ onSubmit }: FormExerciseProps) {
  const { register, handleSubmit } = useForm<FormExerciseValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
      </div>

      <input type="submit" />
    </form>
  );
}
