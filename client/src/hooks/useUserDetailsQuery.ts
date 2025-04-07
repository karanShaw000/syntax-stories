import { fetchUserDetails } from "@/api/user"
import { useQuery } from "@tanstack/react-query"

const useUserDetailsQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserDetails
  })
}

export default useUserDetailsQuery

