import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { NextFunction, Request, Response } from "express";
import { config } from "../configs/app.config";
import { registerSchema } from "../validations/auth.validation";
import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/message";
import { registerUserService } from "../services/auth.service";
import passport from "passport";

export const googleLoginCallback = asyncHandler(async (req: Request, res: Response) => {
  const currentWorkspace = req.user?.currentWorkspace;
  if (!currentWorkspace) {
    return res.redirect(`${config.FRONTEND_URL}?status=fail`);
  }

  return res.redirect(`${config.FRONTEND_URL}/workspaces/${currentWorkspace}`);
});

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse({
    ...req.body
  });

  await registerUserService(body);

  return res.status(HttpStatus.CREATED).json({
    message: Messages.REGISTRATION_SUCCESS
  });
});

export const loginUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: Error | null, user: Express.User | false, info: { message: string | undefined }) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: info?.message || Messages.INVALID_CREDENTIALS
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.status(HttpStatus.OK).json({
          message: Messages.LOGIN_SUCCESS,
          user
        });
      });
    }
  )(req, res, next);
});
