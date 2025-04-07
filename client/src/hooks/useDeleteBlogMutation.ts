import { deleteBlog } from "@/api/blog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      toast.success(data?.message)
    },
    onError: (err: Error) => {
      toast.error(err.message)
    }
  })
}

export default useDeleteBlogMutation
