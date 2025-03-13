import { createTaskSchema } from "../validations/task.validation";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { projectIdSchema } from "../validations/project.validation";
import { workspaceIdSchema } from "../validations/workspace.validation";
import { getMemberRoleInWorkspaceService } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../constants/enum";
import { createTaskService } from "../services/task.service";
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
