import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { AuthResponse } from "../types/AuthResponse";
import type { AuthRequest } from "../types/AuthRequest";

const data = {
  username: "Gosia",
  password: "123",
};

export const useLogin = () => {
  return useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: (data: AuthRequest) => {
      return axios
        .post(
          "/api/v1/login",
          data,
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      console.log("Login successful!");
      return "Success";
    },
    onError: (error: any) => {
      console.log(error.message);
      return "Error";
    },
  });
};
