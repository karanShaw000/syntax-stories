import BlogActions from "@/components/Blogs/BlogActions"
import { Skeleton } from "@/components/ui/skeleton"
import useBlogByIdQuery from "@/hooks/useBlogByIdQuery"
import timer from "@/lib/timer"
import { useParams } from "react-router"

const Blog = () => {
  const { blogId } = useParams<{ blogId: string }>()
  const { data, isLoading, isError } = useBlogByIdQuery(blogId!)

  if (isLoading) {
    return (
      <section className="max-w-3xl mx-auto space-y-4">
        <Skeleton className="mx-auto w-2/3 h-20" />
        <div className="space-y-4">
          <Skeleton className="w-1/4 h-5" />
          <Skeleton className="w-1/4 h-5" />
        </div>
        <Skeleton className="h-56" />
      </section>
    )
  }

  if (isError) {
    return (
      <p className="text-center ">Sorry!! Something went wrong :(</p>
    )
  }

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-center text-4xl font-bold ">{data?.data?.title}</h1>
      <div className="md:flex items-center justify-between ">
        <div>
          <p>{`Posted by: ${data?.data?.userId.username}`}</p>
          <p>{`${data?.data?.edited ? "Edited" : "Created"}: ${data?.data?.edited && data.data.updatedAt ? timer(data?.data?.updatedAt) : timer(data?.data?.createdAt!)}`}</p>
        </div>
        {data?.data?.isUserBlog && <BlogActions blogId={blogId!} />}
      </div>
      <p className="text-lg">{data?.data?.content}</p>
    </section>
  )
}
export default Blog
