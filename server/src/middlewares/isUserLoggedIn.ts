import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ITokenJwtPayload } from "./authMiddlerware";

export interface IsUserLoggedInRequest extends Request {
  isLoggedIn?: boolean
  userId?: string
}

const isUserLoggedIn = (req: IsUserLoggedInRequest, _: Response, next: NextFunction) => {
  try {
    const token = req.signedCookies?.token;

    if (!token) {
      req.isLoggedIn = false;
      req.userId = "";
      return next();
    }

    const decodedToken = verify(
      token,
      process.env.JWT_SECRET as string
    ) as ITokenJwtPayload;

    req.isLoggedIn = true;
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    req.isLoggedIn = false;
    req.userId = "";
    next(); // still allow access to next middleware
  }
}

export default isUserLoggedIn
