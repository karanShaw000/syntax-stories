import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { fetchBlogs } from "../api/blog"


const useBlogsQuery = (page: number) => {
  return useQuery({
    queryKey: ['blogs', page],
    queryFn: () => fetchBlogs(page),
    placeholderData: keepPreviousData
  })
}

export default useBlogsQuery

