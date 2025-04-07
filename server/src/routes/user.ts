import express from "express"
import UserController from "../controller/user"
import authMiddleware from "../middlewares/authMiddlerware"
import checkUserId from "../middlewares/checkUserId"
import { loginLimitter, registerLimitter } from "../middlewares/rateLimitter"

const router = express.Router()

router.post("/register", registerLimitter, UserController.userRegister)
router.post("/login", loginLimitter, UserController.userLogin)
router.post("/logout", authMiddleware, checkUserId, UserController.userLogout)
router.get("/", authMiddleware, UserController.userDetails)

export { router as userRouter } 
