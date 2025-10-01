import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError } from "axios";

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation<void, AxiosError, string>({
    mutationFn: (friendId: string) => {
        return axios.delete(`http://localhost:8080/api/v1/friends/${friendId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
};
