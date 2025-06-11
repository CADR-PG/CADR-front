import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/client";

function useFetchUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
  });
}

export default useFetchUser;
