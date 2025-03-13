import { createTaskSchema, taskIdSchema, updateTaskSchema } from "../validations/task.validation";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { projectIdSchema } from "../validations/project.validation";
import { workspaceIdSchema } from "../validations/workspace.validation";
import { getMemberRoleInWorkspaceService } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../constants/enum";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService
} from "../services/task.service";
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

export const getAllTasksController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const userId = req.user?._id;

  const folters = {
    projectId: req.query.projectId as string | undefined,
    assignedTo: req.query.assignedTo ? (req.query.assignedTo as string)?.split(",") : undefined,
    priority: req.query.priority ? (req.query.priority as string)?.split(",") : undefined,
    status: req.query.status ? (req.query.status as string)?.split(",") : undefined,
    keyword: req.query.keyword as string | undefined,
    dueDate: req.query.dueDate as string | undefined
  };

  const pagination = {
    pageSize: parseInt(req.query.pageSize as string) || 10,
    pageNumber: parseInt(req.query.pageNumber as string) || 1
  };

  const { role } = await getMemberRoleInWorkspaceService(userId, workspaceId);
  roleGuard(role, [Permissions.VIEW_ONLY]);

  const result = await getAllTasksService(workspaceId, folters, pagination);
  return res.status(HttpStatus.OK).json({
    message: Messages.SUCCESS,
    ...result
  });
});

export const getTaskByIdController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const taskId = taskIdSchema.parse(req.params.id);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const { role } = await getMemberRoleInWorkspaceService(userId, workspaceId);
  roleGuard(role, [Permissions.VIEW_ONLY]);

  const task = await getTaskByIdService(workspaceId, projectId, taskId);

  return res.status(HttpStatus.OK).json({
    message: Messages.SUCCESS,
    task
  });
});

export const deleteTaskController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const taskId = taskIdSchema.parse(req.params.id);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const { role } = await getMemberRoleInWorkspaceService(userId, workspaceId);
  roleGuard(role, [Permissions.DELETE_TASK]);

  await deleteTaskService(workspaceId, taskId);

  return res.status(HttpStatus.OK).json({
    message: Messages.DELETED
  });
});
