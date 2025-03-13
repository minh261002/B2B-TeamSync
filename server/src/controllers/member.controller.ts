import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/message";
import { z } from "zod";
import { joinWorkspaceByInviteCodeService } from "src/services/member.service";

export const joinWorkspaceController = asyncHandler(async (req: Request, res: Response) => {
  const inviteCode = z.string().parse(req.params.inviteCode);
  const userId = req.user?._id;

  const { workspaceId, role } = await joinWorkspaceByInviteCodeService(inviteCode, userId);

  return res.status(HttpStatus.OK).json({
    message: Messages.SUCCESS,
    workspaceId,
    role
  });
});
