import { useQuery } from "@tanstack/react-query"
import { fetchUserBlogs } from "../api/blog"

const useUserBlogsQuery = (page:number) => {
  return useQuery({
    queryKey: ['blogs', 'user', page],
    queryFn: () => fetchUserBlogs(page)
  })
}

export default useUserBlogsQuery

