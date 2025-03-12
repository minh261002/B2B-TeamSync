import { Messages } from "../constants/message";
import { z } from "zod";

export const emailSchema = z.string().trim().email(Messages.EMAIL_INVALID).min(1).max(255);

export const passwordSchema = z.string().min(4).trim();

export const registerSchema = z.object({
  name: z.string().min(3).max(255),
  email: emailSchema,
  password: passwordSchema
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});
