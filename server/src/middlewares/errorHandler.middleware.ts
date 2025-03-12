import { ErrorRequestHandler, Response } from "express";
import { AppError } from "../utils/appError";
import { z, ZodError } from "zod";
import { HttpStatus } from "../constants/httpStatus";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message
  }));
  return res.status(HttpStatus.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: HttpStatus.BAD_REQUEST
  });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
  console.error(`Error Occured on PATH: ${req.path} `, error);

  if (error instanceof SyntaxError) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request body."
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode
    });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknow error occurred"
  });
};
