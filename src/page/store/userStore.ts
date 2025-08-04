import { create } from "zustand";
import type { AuthResponse } from "../auth/types/AuthResponse";

type UserStore = AuthResponse & {
  setUserData: (value: AuthResponse) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  username: "",
  firstname: "",
  lastname: "",
  city: "",
  email: "",

  setUserData: (value: AuthResponse) => {
    set((prev: any) => ({
      ...prev,
      ...value,
    }));
  },
}));
