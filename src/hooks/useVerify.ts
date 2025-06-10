import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/client";

function useVerify() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      navigate('/');
    }
  })
}

export default useVerify;
