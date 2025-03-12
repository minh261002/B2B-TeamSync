import { getMemberRoleInWorkspaceService } from "../services/member.service";
import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/message";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createWorkspaceService,
  getAllWorkspaceUserIsMemberOfService,
  getWorkspaceByIdService
} from "../services/workspace.service";
import { createWorkspaceSchema, workspaceIdSchema } from "../validations/workspace.validation";

export const createWorkspaceController = asyncHandler(async (req, res) => {
  const body = createWorkspaceSchema.parse(req.body);
  const userId = req.user?._id;

  const workspace = await createWorkspaceService(userId, body);

  return res.status(HttpStatus.CREATED).json({
    message: Messages.CREATED,
    workspace
  });
});

export const getAllWorkspaceUserIsMemberOfController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { workspaces } = await getAllWorkspaceUserIsMemberOfService(userId);

  return res.status(HttpStatus.OK).json({
    message: Messages.SUCCESS,
    workspaces
  });
});

export const getWorkspaceByIdController = asyncHandler(async (req, res) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user?._id;

  await getMemberRoleInWorkspaceService(userId, workspaceId);

  const { workspace } = await getWorkspaceByIdService(workspaceId);

  return res.status(HttpStatus.OK).json({
    message: Messages.SUCCESS,
    workspace
  });
});
