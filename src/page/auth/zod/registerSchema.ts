import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstname: z.string().nonempty("Firstname is required"),
  lastname: z.string().nonempty("Lastname is required"),
  email: z.string().nonempty("Email is required"),
  city: z.string().nonempty("City is required"),
});