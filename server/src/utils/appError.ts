import { HttpStatus, HttpStatusType } from "../constants/httpStatus";
import { MessagesType, Messages } from "../constants/message";

export class AppError extends Error {
  public statusCode: HttpStatusType | number;
  public errorCode?: HttpStatusType;

  constructor(message: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR, errorCode?: MessagesType) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpException extends AppError {
  constructor(message = Messages.SERVER_ERROR, statusCode: HttpStatusType, errorCode?: MessagesType) {
    super(message, statusCode, errorCode);
  }
}

export class InternalServerException extends AppError {
  constructor(message = Messages.SERVER_ERROR, errorCode?: MessagesType) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, errorCode || Messages.SERVER_ERROR);
  }
}

export class NotFoundException extends AppError {
  constructor(message = Messages.NOT_FOUND, errorCode?: MessagesType) {
    super(message, HttpStatus.NOT_FOUND, errorCode || Messages.NOT_FOUND);
  }
}

export class BadRequestException extends AppError {
  constructor(message = Messages.INVALID_INPUT, errorCode?: MessagesType) {
    super(message, HttpStatus.BAD_REQUEST, errorCode || Messages.INVALID_INPUT);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = Messages.UNAUTHORIZED, errorCode?: MessagesType) {
    super(message, HttpStatus.UNAUTHORIZED, errorCode || Messages.UNAUTHORIZED);
  }
}
