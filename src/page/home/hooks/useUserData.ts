import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { UserResponse } from "../types/UserResponse";

export const useUserData = () => {
  const token = localStorage.getItem("token");

  return useQuery<UserResponse, AxiosError>({
    queryKey: ["users"],
    queryFn: () => {
      return axios
        .get("http://localhost:8080/api/v1/users/data", {
          headers: {
            Authorization: token === null ? null : `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
    retry: (failureCount, error: AxiosError) => {
      if (error.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
