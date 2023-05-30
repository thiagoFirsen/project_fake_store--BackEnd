import { Request, Response, NextFunction } from "express";
import { ErrorType } from "../types";

export const errorHandler = (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status ? error.status : 500;
  const errorResponse = {
    message: error.message ? error.message : "internal server error",
    stack: error.stack,
  };
  res.status(status).json(errorResponse);
};

export const makeError = ({ message, status }: ErrorType) => {
  return { message, status };
};
