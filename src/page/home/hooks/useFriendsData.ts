import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";
import type { FriendsResponse } from "../types/FriendsResponse";

export const useFriendsData = () => {
  const token = localStorage.getItem("token");

  return useQuery<FriendsResponse[], AxiosError>({
    queryKey: ["friends"],
    queryFn: () => {
      return axios
        .get("http://localhost:8080/api/v1/friends", {
          headers: {
            Authorization: token === null ? null : `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
  });
};
