import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUserUpdate = (userId: number) => {
  return useMutation({
    mutationFn: async (data: string) => {
      const res = await axios.patch("/api/v1/login", data, {
        headers: {
          id: userId,
        },
      });
      return res.data;
    },
  });
};
