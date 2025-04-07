import BlogCard from "@/components/Blogs/BlogCard"
import BlogCardSkeleton from "@/components/Blogs/BlogCardSkeleton"
import { BlogsPagination } from "@/components/BlogsPagination"
import useBlogsQuery from "@/hooks/useBlogsQuery"
import { useState } from "react"

const Blogs = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useBlogsQuery(page)

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    )
  }
  if (isError) return <p className="text-center">Something went Wrong</p>
  if (data?.data?.blogs.length === 0) return <p className="text-center">Yay you have seen all the blogs!!</p>
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {
        data?.data?.blogs.map(blog => <BlogCard
          key={blog._id}
          _id={blog._id}
          createdAt={blog.createdAt}
          edited={blog.edited}
          userId={blog.userId}
          title={blog.title}
          isUserBlog={blog.isUserBlog}
          updatedAt={blog.updatedAt}
          content={blog.content} />)
      }
      <BlogsPagination currentPage={data?.data?.currentPage ?? 1} totalPages={data?.data?.totalPage ?? 1} onPageChange={setPage} />
    </div>
  )
}

export default Blogs
