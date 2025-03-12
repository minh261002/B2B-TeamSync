import { cp } from "fs";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/message";
import { getCurrentUserService } from "../services/user.service";

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { user } = await getCurrentUserService(userId);

  return res.status(HttpStatus.OK).json({
    message: Messages.SUCCESS,
    user
  });
});
