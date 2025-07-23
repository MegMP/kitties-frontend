import { useLogin } from "./hooks/useAuthenticate";
import { useState } from "react";
import { InvalidData } from "./mod/InvalidData";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [result, setResult] = useState("");
  const loginMutation = useLogin();

  type FormData = {
    username: string;
    password: string;
  };

  const onSubmit = async (data: FormData) => {
    loginMutation.mutate(
      data,
      {
        onSuccess: () => {
          setResult("Success");
        },
        onError: (error: any) => {
          console.error(
            "Login error:",
            error.response ?? error.message ?? error
          );
          setResult("Error");
        },
      }
    );
  };

  return (
    <>
      <h1>This is the login page</h1>
      {result === "Error" && (
        <InvalidData message="Wrong username or password" />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="username"
          {...register("username", { required: true })}
          placeholder="Username"
          required
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          required
        />
        <button type="submit">Log in</button>
      </form>
      <a href="/register">register</a>
    </>
  );
};
