import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { creayeProjectSchema } from "../validations/project.validation";
import { workspaceIdSchema } from "../validations/workspace.validation";
import { getMemberRoleInWorkspaceService } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../constants/enum";
import { createProjectService, getAllProjectInWorkspaceService } from "../services/project.service";
import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/message";

export const createProjectController = asyncHandler(async (req: Request, res: Response) => {
  const body = creayeProjectSchema.parse(req.body);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const userId = req.user?._id;

  const { role } = await getMemberRoleInWorkspaceService(userId, workspaceId);
  roleGuard(role, [Permissions.CREATE_PROJECT]);

  const { project } = await createProjectService(workspaceId, userId, body);

  return res.status(HttpStatus.CREATED).json({
    message: Messages.SUCCESS,
    project
  });
});

export const getAllProjectsController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const userId = req.user?._id;

  const { role } = await getMemberRoleInWorkspaceService(userId, workspaceId);
  roleGuard(role, [Permissions.VIEW_ONLY]);

  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const pageNumber = parseInt(req.query.pageNumber as string) || 1;

  const { projects, totalCount, totalPages, skip } = await getAllProjectInWorkspaceService(
    workspaceId,
    pageSize,
    pageNumber
  );

  return res.status(HttpStatus.OK).json({
    message: Messages.SUCCESS,
    projects,
    pagination: {
      totalCount,
      totalPages,
      pageSize,
      pageNumber,
      skip,
      limit: pageSize
    }
  });
});
