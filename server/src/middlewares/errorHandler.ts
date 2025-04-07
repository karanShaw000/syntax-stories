import { Request, Response, NextFunction } from "express"
import ExpressError from "../utils/expressError"

const errorHandler = (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went worng",
  })
}

export default errorHandler
