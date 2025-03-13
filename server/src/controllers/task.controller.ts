import { createTaskSchema, taskIdSchema, updateTaskSchema } from "../validations/task.validation";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { projectIdSchema } from "../validations/project.validation";
import { workspaceIdSchema } from "../validations/workspace.validation";
import { getMemberRoleInWorkspaceService } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../constants/enum";
import { createTaskService, updateTaskService } from "../services/task.service";
import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/message";

export const createTaskController = asyncHandler(async (req: Request, res: Response) => {
  const body = createTaskSchema.parse(req.body);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const userId = req.user?._id;

  const { role } = await getMemberRoleInWorkspaceService(userId, workspaceId);
  roleGuard(role, [Permissions.CREATE_TASK]);

  const { task } = await createTaskService(workspaceId, projectId, userId, body);

  return res.status(HttpStatus.CREATED).json({
    message: Messages.SUCCESS,
    task
  });
});

export const updateTaskController = asyncHandler(async (req: Request, res: Response) => {
  const body = updateTaskSchema.parse(req.body);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const taskId = taskIdSchema.parse(req.params.id);
  const userId = req.user?._id;

  const { task } = await updateTaskService(workspaceId, projectId, taskId, userId, body);
  return res.status(HttpStatus.OK).json({
    message: Messages.SUCCESS,
    task
  });
});
