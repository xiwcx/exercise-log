import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import slugify from "slugify";

type Exercise = {
  name: string;
};

type FormExerciseProps = {
  onSubmit: (data: Exercise) => void;
  loading: boolean;
};

type FormExerciseValues = {
  name: string;
  slug: string;
};

export function FormExercise({ onSubmit }: FormExerciseProps) {
  const { register, handleSubmit, setValue } = useForm<FormExerciseValues>();

  const handleNameChange = useCallback(
    (e) => {
      setValue("name", e.target.value);
      setValue("slug", slugify(e.target.value));
    },
    [setValue]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name")} onChange={handleNameChange} />
      </div>
      <div>
        <label>Slug</label>
        <input {...register("slug")} readOnly />
      </div>

      <input type="submit" />
    </form>
  );
}
