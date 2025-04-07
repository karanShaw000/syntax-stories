import { fetchBlogById } from "@/api/blog"
import { useQuery } from "@tanstack/react-query"

const useBlogByIdQuery = (blogId: string) => {
  return useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => fetchBlogById(blogId),
    enabled: !!blogId
  })
}
export default useBlogByIdQuery
