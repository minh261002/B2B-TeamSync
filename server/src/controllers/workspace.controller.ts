import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/message";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createWorkspaceService } from "../services/workspace.service";
import { createWorkspaceSchema } from "../validations/workspace.validation";

export const createWorkspaceController = asyncHandler(async (req, res) => {
  const body = createWorkspaceSchema.parse(req.body);
  const userId = req.user?._id;

  const workspace = await createWorkspaceService(userId, body);

  return res.status(HttpStatus.CREATED).json({
    message: Messages.CREATED,
    workspace
  });
});
