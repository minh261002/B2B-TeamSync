import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import { Messages } from "../constants/message";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user._id) {
    throw new UnauthorizedException(Messages.UNAUTHORIZED);
  }
  next();
};

export default isAuthenticated;
