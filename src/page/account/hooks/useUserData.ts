import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserData = (userId: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await axios.get(
        "/api/v1/accounts",
        {
          headers: {
            "id": userId,
          },
        }
      );
      return response.data;
    },
  });
};
