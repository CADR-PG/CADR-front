import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/client";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

function useLogout() {
  const navigate = useNavigate();
  const { logoutUser, isLoggedIn } = useUserStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("huuhhh");
      logoutUser();
      navigate('/');
      console.log(isLoggedIn);
    }
  })
}

export default useLogout;
