import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userLogout } from "../api/user";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLogoutMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => userLogout(),
    onSuccess: (data) => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      queryClient.invalidateQueries({queryKey: ["blogs"]})
      navigate("/login");
      toast.success(data?.message)
    },
    onError: (err: Error) => {
      toast.error(err.message)
    },
  })
}

export default useLogoutMutation
