import React from "react";
import { createBrowserRouter } from "react-router";
import { checkIsLogin } from "@/lib/auth";
import RootLayout from "@/layout/RootLayout";
const Login = React.lazy(() => import('@/pages/Login'))
const Register = React.lazy(() => import('@/pages/Register'))
const UserBlogs = React.lazy(() => import('@/pages/UserBlogs'))
const CreateBlog = React.lazy(() => import('@/pages/CreateBlog'))
const EditBlog = React.lazy(() => import('@/pages/EditBlog'))
const Blog = React.lazy(() => import('@/pages/Blog'))
const Blogs = React.lazy(() => import('@/pages/Blogs'))


export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Blogs />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'create',
          loader: checkIsLogin,
          element: <CreateBlog />
        },
        {
          path: 'blog/:blogId',
          element: <Blog />
        },
        {
          path: 'edit/:blogId',
          loader: checkIsLogin,
          element: <EditBlog />
        },
        {
          path: 'user',
          loader: checkIsLogin,
          element: <UserBlogs />
        },
      ],
    },
  ]
)



