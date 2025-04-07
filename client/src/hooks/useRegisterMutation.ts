import { useMutation } from "@tanstack/react-query"
import { userSignup } from "../api/user";
import { User } from "../lib/types";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useRegisterMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (signupData: Omit<User, "_id">) => userSignup(signupData),
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

export default useRegisterMutation
