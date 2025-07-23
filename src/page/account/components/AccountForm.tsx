import { useForm } from "react-hook-form";
import { useUserUpdate } from "../hooks/useUserUpdate";

type AccountAttribute =
  | "firstname"
  | "lastname"
  | "email"
  | "username"
  | "password"
  | "city";

type AccountFormProps = {
  userId: number;
  type: AccountAttribute;
  placeholder?: string;
  required?: boolean;
};

type FormData = {
  value: string;
};

export const AccountForm = ({
  userId,
  type,
  placeholder,
  required,
}: AccountFormProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const updateMutation = useUserUpdate(userId);

  const onSubmit = async (data: FormData) => {
    updateMutation.mutate(data.value, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type={type == "password" ? "password" : "text"}
          {...register("value", { required })}
          placeholder={placeholder}
          required={required}
        />
        <button type="submit">Change</button>
      </form>
      <br />
    </>
  );
};
