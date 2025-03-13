import { z } from "zod";

export const emojiSchema = z.string().trim().optional();
export const nameSchema = z.string().trim().max(255);
export const descriptionSchema = z.string().trim().optional();
export const projectIdSchema = z.string().trim().min(1);

export const creayeProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema
});

export const updateProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema
});
