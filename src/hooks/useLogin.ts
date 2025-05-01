import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      navigate('/')
    }
  });
}
