import { createBlog } from "@/api/blog"
import { Blog } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const useCreateBlogMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (blogData: Pick<Blog, "title" | "content">) => createBlog(blogData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      toast.success(data?.message)
      navigate("/")
    },
    onError: (err: Error) => {
      toast.error(err.message)
    }
  })
}

export default useCreateBlogMutation

