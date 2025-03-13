import { z } from "zod";

export const nameSchema = z.string().trim().min(1, { message: "Tên không được để trống" }).max(255);
export const descSchema = z.string().trim().optional();
export const workspaceIdSchema = z.string().trim().min(1, { message: "Id không được để trống" });

export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descSchema
});

export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descSchema
});

export const changeRoleSchema = z.object({
  roleId: z.string().trim().min(1, { message: "Id không được để trống" }),
  memberId: z.string().trim().min(1, { message: "Role không được để trống" })
});
