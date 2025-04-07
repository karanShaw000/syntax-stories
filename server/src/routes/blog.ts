import express from "express"
import BlogController from "../controller/blog"
import authMiddleware from "../middlewares/authMiddlerware"
import checkUserId from "../middlewares/checkUserId"
import isUserLoggedIn from "../middlewares/isUserLoggedIn"

const router = express.Router()

router.get("/", isUserLoggedIn,  BlogController.blogFeed)

router.post("/", authMiddleware, checkUserId, BlogController.createBlog)

router.get("/user", authMiddleware, checkUserId, BlogController.getUserBlogs)


router.route("/:id")
  .get(isUserLoggedIn, BlogController.getBlogById)
  .patch(authMiddleware, checkUserId, BlogController.updateBlog)
  .delete(authMiddleware, checkUserId, BlogController.deleteBlog)



export { router as blogRouter } 
