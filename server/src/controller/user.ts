import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user";
import ExpressError from "../utils/expressError";
import asyncCatch from "../utils/asyncCatch";
import { IAuthRequest } from "../middlewares/authMiddlerware";
import { Blog } from "../models/blog";

dotenv.config();

class UserController {
  static userRegister = asyncCatch(
    async (req: Request, res: Response, _: NextFunction) => {
      const { username, password } = req.body;
      if (!username || !password)
        throw new ExpressError("Enter username or password", 400);

      let user = await User.findOne({ username });

      if (user) {
        throw new ExpressError(
          "user with this username already exists.Try different one",
          400
        );
      }

      user = new User({ username, password });
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const token = sign(
        { userId: user._id },
        process.env.JWT_SECRET as string
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
        signed: true,
        sameSite: "none",
      });
      res
        .status(200)
        .json({ message: "Register Successfully", data: { userId: user._id } });
    }
  );

  static userLogin = asyncCatch(
    async (req: Request, res: Response, _: NextFunction) => {
      const { username, password } = req.body;
      if (!username || !password)
        throw new ExpressError("Enter username or password", 400);

      let user = await User.findOne({ username });
      if (!user) throw new ExpressError("User not found", 404);

      const result = await bcrypt.compare(password, user.password);
      if (!result) throw new ExpressError("Password Incorrect", 400);

      const token = sign(
        { userId: user._id },
        process.env.JWT_SECRET as string
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
        signed: true,
        sameSite: "none",
      });

      res
        .status(200)
        .json({ message: "Login Successfully", data: { userId: user._id } });
    }
  );

  static userLogout = asyncCatch(async (req: IAuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) throw new ExpressError("User logout already", 401);

    res.clearCookie("token", {
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "User logout successfully" });
  });

  static userDetails = asyncCatch(async (req: IAuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId)
      throw new ExpressError(
        "Authentication failed. Please log in and try again.",
        401
      );

    const user = await User.findById(userId).select("-password");
    if (!user)
      throw new ExpressError("Authorization failed. User not found", 401);

    const userBlogsCount = await Blog.countDocuments({ userId });

    res
      .status(200)
      .json({ message: "User Details", data: { user, userBlogsCount } });
  });
}

export default UserController;
