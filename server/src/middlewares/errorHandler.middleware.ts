import { ErrorRequestHandler } from "express";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/message";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.error(`Error occurred on Path ${req.path} `, error);

  if (error instanceof SyntaxError) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: Messages.INVALID_INPUT,
      error: error?.message || "Invalid JSON payload"
    });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: Messages.SERVER_ERROR,
    error: error?.message || "Unknown error occurred"
  });
};
