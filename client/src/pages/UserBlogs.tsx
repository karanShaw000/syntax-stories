import BlogCard from "@/components/Blogs/BlogCard"
import BlogCardSkeleton from "@/components/Blogs/BlogCardSkeleton"
import { BlogsPagination } from "@/components/BlogsPagination"
import { Skeleton } from "@/components/ui/skeleton"
import useUserBlogsQuery from "@/hooks/useUserBlogsQuery"
import useUserDetailsQuery from "@/hooks/useUserDetailsQuery"
import { useState } from "react"

const UserBlogs = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useUserBlogsQuery(page)
  const userDetailQuery = useUserDetailsQuery()
  if (isLoading || userDetailQuery.isLoading) {
    return (
      <div className=" max-w-2xl mx-auto space-y-4">
        <Skeleton className="mx-auto w-2/5 h-10" />
        <Skeleton className="mx-auto w-2/5 h-10" />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    )

  }
  if (isError || userDetailQuery.isError) return <p className="text-center">Something went Wrong</p>

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <p className="text-center">{`Username: ${userDetailQuery.data?.data?.user.username}`}</p>
      <p className="text-center">{`Blog Count: ${userDetailQuery.data?.data?.userBlogsCount}`}</p>

      {
        data?.data?.blogs.length === 0 ?
          (<p className="text-center">You have not uploaded any blogs :(</p>)
          : (data?.data?.blogs.map(blog => <BlogCard
            key={blog._id}
            _id={blog._id}
            createdAt={blog.createdAt}
            edited={blog.edited}
            userId={blog.userId}
            title={blog.title}
            isUserBlog={blog.isUserBlog}
            updatedAt={blog.updatedAt}
            content={blog.content} />
          ))
      }
      <BlogsPagination currentPage={data?.data?.currentPage ?? 1} totalPages={data?.data?.totalPage ?? 1} onPageChange={setPage} />
    </div>
  )
}

export default UserBlogs
