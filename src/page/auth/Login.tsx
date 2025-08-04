import { useLogin } from "./hooks/useAuthenticate";
import { useState } from "react";
import { InvalidData } from "./mod/InvalidData";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import type { AuthResponse } from "./types/AuthResponse";

type FormData = {
  username: string;
  password: string;
};

export const Login = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { loginMutation, error, isSuccess, isError } = useLogin();

  const onSubmit = async (data: FormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response: AuthResponse) => {
        localStorage.setItem("token", response.token);
        reset();
      },
      onError: (error: any) => {},
    });
  };

  if (isSuccess === true) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>This is the login page</h1>
      {error?.response?.status === 403 && (
        <InvalidData message={"Invalid username or password"} />
      )}
      {isError && error?.response?.status !== 403 && (
        <InvalidData message={"Sorry, something went wrong"} />
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
