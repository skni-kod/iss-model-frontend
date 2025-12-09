import { z } from "zod";

// Login form schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Nazwa użytkownika jest wymagana"),
  password: z
    .string()
    .min(1, "Hasło jest wymagane")
    .min(6, "Hasło musi mieć minimum 6 znaków"),
});

export type LoginFormData = z.infer<typeof loginSchema>;


// Register form schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nazwa użytkownika jest wymagana")
      .min(2, "Nazwa użytkownika musi mieć minimum 2 znaki"),
    email: z
      .string()
      .min(1, "Email jest wymagany")
      .email("Nieprawidłowy adres email"),
    password: z
      .string()
      .min(1, "Hasło jest wymagane")
      .min(8, "Hasło musi mieć minimum 8 znaków")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Hasło musi zawierać małą, wielką literę i cyfrę"
      ),
    confirmPassword: z.string().min(1, "Potwierdzenie hasła jest wymagane"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są identyczne",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
