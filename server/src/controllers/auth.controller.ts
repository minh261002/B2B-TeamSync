import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { config } from "../configs/app.config";

export const googleLoginCallback = asyncHandler(async (req: Request, res: Response) => {
  const currentWorkspace = req.user?.currentWorkspace;
  if (!currentWorkspace) {
    return res.redirect(`${config.FRONTEND_URL}?status=fail`);
  }

  return res.redirect(`${config.FRONTEND_URL}/workspaces/${currentWorkspace}`);
});
