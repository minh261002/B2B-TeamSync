import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request, Response } from "express";

export const googleLoginCallback = asyncHandler(async (req: Request, res: Response) => {});
