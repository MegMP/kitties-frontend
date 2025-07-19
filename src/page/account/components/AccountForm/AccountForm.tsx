import axios from "axios";
import { useForm } from "react-hook-form";
import type { AccountFormProps, FormData } from "./AccountForm.types";

export const AccountForm = ({
  userId,
  handleChangeValue,
  type,
  placeholder,
  required,
}: AccountFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (type == "firstname") {
        await axios.patch(
          `/api/v1/accounts/firstname`,
          { username: data.value },
          { headers: { id: userId } }
        );
      } else if (type === "username") {
        await axios.patch(
          `/api/v1/accounts/username`,
          { username: data.value },
          { headers: { id: userId } }
        );
      } else if (type === "password") {
        await axios.patch(
          `/api/v1/accounts/password`,
          { password: data.value },
          { headers: { id: userId } }
        );
      } else if (type === "city") {
        await axios.patch(
          `/api/v1/accounts/city`,
          { city: data.value },
          { headers: { id: userId } }
        );
      }
      handleChangeValue(data.value, type);
    } catch (error) {
      console.error("Error:", error);
    }
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
