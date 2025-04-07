import { Request, Response } from "express"
import asyncCatch from "../utils/asyncCatch"
import { Blog, IBlog } from "../models/blog"
import ExpressError from "../utils/expressError"
import { IAuthRequest } from "../middlewares/authMiddlerware"
import { IsUserLoggedInRequest } from "../middlewares/isUserLoggedIn"

class BlogController {

  static blogPerPage = 10

  static blogFeed = asyncCatch(async (req: IsUserLoggedInRequest, res: Response) => {
    const isLoggedIn = req.isLoggedIn
    const userId = req.userId
    let page = parseInt(req.query.page as string)
    if (!page || page < 1) page = 1


    let blogs = await Blog.find().sort({ createdAt: -1 }).populate("userId", "username").lean();

    let totalPage = Math.ceil(blogs.length / this.blogPerPage)
    if (!totalPage) totalPage = 0;
    if (page > totalPage) page = totalPage

    const startIndex = (page - 1) * this.blogPerPage
    const lastIndex = page * this.blogPerPage
    blogs = blogs.slice(startIndex, lastIndex)

    if (isLoggedIn && userId) {
      const blogsWithFlag = blogs.map((blog) => {
        const isUserBlog = blog.userId._id.toString() === userId.toString()
        return { ...blog, isUserBlog }
      })
      res.status(200).json({ message: "Blog Feed", data: { blogs: blogsWithFlag, currentPage: page, totalPage: totalPage } })
    } else {
      res.status(200).json({ message: "Blog Feed", data: { blogs: blogs, currentPage: page, totalPage: totalPage } })
    }
  })

  static getUserBlogs = asyncCatch(async (req: IAuthRequest, res: Response) => {
    const userId = req.userId
    let page = parseInt(req.query.page as string)
    if (!page || page < 1) page = 1

    if (!userId) throw new ExpressError("Authentication failed. Please log in and try again.", 401)

    let blogs = await Blog.find({ userId }).sort({ createdAt: -1 }).populate("userId", "username").lean();

    let totalPage = Math.ceil(blogs.length / this.blogPerPage)
    if (!totalPage) totalPage = 0;
    if (page > totalPage) page = totalPage

    const startIndex = (page - 1) * this.blogPerPage
    const lastIndex = page * this.blogPerPage
    blogs = blogs.slice(startIndex, lastIndex)

    const blogsWithFlag = blogs.map((blog) => {
      const isUserBlog = blog.userId._id.toString() === userId.toString()
      return { ...blog, isUserBlog }
    })

    res.status(200).json({ message: "User Blogs", data: { blogs: blogsWithFlag, currentPage: page, totalPage: totalPage } })
  })

  static getBlogById = asyncCatch(async (req: IsUserLoggedInRequest, res: Response) => {
    const blogId = req.params.id
    if (!blogId) throw new ExpressError("Blog ID is required in the request parameters.", 400)
    const isLoggedIn = req.isLoggedIn
    const userId = req.userId

    if (!userId) throw new ExpressError("Authentication failed. Please log in and try again.", 401)

    const blog = await Blog.findById(blogId).populate("userId", "username").lean()

    if (!blog) throw new ExpressError("No blog found with the provided ID", 404)

    if (isLoggedIn && userId) {
      const isUserBlog = blog?.userId._id.toString() === userId?.toString()
      const blogWithFlag = { ...blog, isUserBlog }
      res.status(200).json({ message: "Blog with the provided ID found", data: blogWithFlag })
    } else {
      res.status(200).json({ message: "Blog with the provided ID found", data: blog })
    }

  });

  static createBlog = asyncCatch(async (req: IAuthRequest, res: Response) => {
    const { title, content } = req.body
    if (!title || !content || title.trim().length === 0 || content.trim().length === 0) throw new ExpressError("Enter the title or content", 400)

    const userId = req.userId
    if (!userId) throw new ExpressError("Authentication failed. Please log in and try again.", 401)

    const blog = new Blog({ userId, title, content })

    await blog.save()

    res.status(200).json({ message: "Blog created successfully", data: { blogId: blog._id } })
  });

  static updateBlog = asyncCatch(async (req: IAuthRequest, res: Response) => {
    const blogId = req.params.id
    if (!blogId) throw new ExpressError("Blog ID is required in the request parameters.", 400)

    const userId = req.userId
    if (!userId) throw new ExpressError("Authentication failed. Please log in and try again.", 401)

    const blogData = req.body as Pick<IBlog, "userId" | "title" | "content">
    if (blogData.userId.toString() !== userId) throw new ExpressError("User cannot update other's blog.", 403)

    const existingBlog = await Blog.findById(blogId)
    if (!existingBlog) throw new ExpressError("No blog found with the provided ID.", 404)

    existingBlog.set({ ...blogData, edited: true, updatedAt: new Date() })

    await existingBlog.save()

    res.status(200).json({ message: "Blog updated successfully", blog: existingBlog })
  });

  static deleteBlog = asyncCatch(async (req: IAuthRequest, res: Response) => {
    const blogId = req.params.id
    if (!blogId) throw new ExpressError("Blog ID is required in the request parameters.", 400)

    const userId = req.userId
    if (!userId) throw new ExpressError("Authentication failed. Please log in and try again.", 401)

    const existingBlog = await Blog.findById(blogId)
    if (!existingBlog) throw new ExpressError("No blog found with the provided ID", 404)

    if (existingBlog.userId.toString() !== userId) throw new ExpressError("User cannot delete other's blog", 403)

    await existingBlog.deleteOne()

    res.status(200).json({ message: "Blog deleted successfully" })
  });
}

export default BlogController
