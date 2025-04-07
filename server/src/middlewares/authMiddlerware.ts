import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import ExpressError from "../utils/expressError";

dotenv.config()

export interface ITokenJwtPayload extends JwtPayload {
  userId: string
}

export interface IAuthRequest extends Request {
  userId?: string
}

export interface IAuthResponse extends Response {
  userId?: string
}


const authMiddleware = (req: IAuthRequest, _: Response, next: NextFunction) => {
  const cookies = req.signedCookies;
  if (!cookies) {
    throw new ExpressError("Unauthorized User(cookie invalid)", 401)
  }
  const token = cookies.token
  if (!token) throw new ExpressError("Unauthorized User(token not found)", 401)

  const decodedToken = verify(token, process.env.JWT_SECRET as string) as ITokenJwtPayload
  if (!decodedToken) throw new ExpressError("Unauthorized User(token invalid)", 401)

  req.userId = decodedToken.userId
  next()
}

export default authMiddleware

