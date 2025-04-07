import { useMutation } from "@tanstack/react-query"
import { userLogin } from "../api/user";
import { User } from "../lib/types";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLoginMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (loginData: Omit<User, "_id">) => userLogin(loginData),
    onSuccess: (data) => {
      localStorage.setItem("isLoggedIn", "true");
      if (data?.data?.userId) localStorage.setItem("userId", data.data.userId);
      navigate("/");
      toast.success(data?.message)
    },
    onError: (err: Error) => {
      toast.error(err.message)
    },
  })
}

export default useLoginMutation
