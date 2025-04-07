import { NextFunction, Response } from "express";
import { IAuthRequest } from "./authMiddlerware";
import ExpressError from "../utils/expressError";
import asyncCatch from "../utils/asyncCatch";
import { User } from "../models/user";

const checkUserId = asyncCatch(async (req: IAuthRequest, _: Response, next: NextFunction) => {
  const userId = req.userId
  if (!userId) throw new ExpressError("Authentication failed. Please log in and try again.", 401)

  const user = await User.findById(userId)
  if (!user) throw new ExpressError("Authorization failed. User not found", 401)

  req.userId = userId
  next()
});

export default checkUserId
