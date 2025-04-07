import { updateBlog } from "@/api/blog"
import { Blog } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const useEditBlogMutation = (id: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (blogData: Pick<Blog, "title" | "content">) => updateBlog(id, blogData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      // queryClient.invalidateQueries({ queryKey: ["blogs"] })
      toast.success(data?.message)
      navigate("/")
    },
    onError: (err: Error) => {
      toast.error(err.message)
    }
  })
}

export default useEditBlogMutation

