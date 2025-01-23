import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Useranme may be atleast more that 2 chrxcater")
  .max(12, "Username mustbeless that the 12 chrcater")
  .regex(/^[a-zA-Z0-9_]+$/, "username must not containe special chrcater");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, {message:"Minimum 6 chracter"}),

});
