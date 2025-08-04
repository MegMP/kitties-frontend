import { useForm } from "react-hook-form";
import { useRegister } from "./hooks/useRegister";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type FormData = {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  city: string;
};

export const Register = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const registerMutation = useRegister();
  const [result, setResult] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        setResult("Success");
        reset()
        navigate("/login")
      },
      onError: (error: any) => {
        setResult(error.response?.data ?? "Unknown error");
      },
    });
  };
  return (
    <>
      <h1>This is the register page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type=""
          {...register("firstname", { required: true })}
          placeholder="Firstname"
          required
        />
        <br />
        <input
          type=""
          {...register("lastname", { required: true })}
          placeholder="Lastname"
          required
        />
        <br />
        <input
          type=""
          {...register("email", { required: true })}
          placeholder="Email"
          required
        />
        <br />
        <input
          type=""
          {...register("username", { required: true })}
          placeholder="Username"
          required
        />
        <br />
        <input
          type=""
          {...register("password", { required: true })}
          placeholder="Password"
          required
        />
        <br />
        <input
          type=""
          {...register("city", { required: true })}
          placeholder="City"
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
