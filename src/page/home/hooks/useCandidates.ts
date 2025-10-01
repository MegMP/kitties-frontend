import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";
import type { FullFriendsResponse } from "../types/FullFriendResponse";

export const useCandidates = () => {
  const token = localStorage.getItem("token");

  return useQuery<FullFriendsResponse[], AxiosError>({
    queryKey: ["friends"],
    queryFn: () => {
      return axios
        .get("http://localhost:8080/api/v1/friends/candidates ", {
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
