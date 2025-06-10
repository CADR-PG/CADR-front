import { useMutation } from "@tanstack/react-query";
import { resendEmail } from "../api/client";

export default function useResend() {
  return useMutation({
    mutationFn: resendEmail,
  })
}
