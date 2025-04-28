import { useState } from 'react';
import { useCustomPostMutation } from './../api/client';

function useSubmission(endpoint: string) {
  const [responseMessage, setResponseMessage] = useState('');
  const { mutate, isSubmitting } = useCustomPostMutation(endpoint);

  const submit = (formData: unknown, successMsg: string = 'Success!') => {
    setResponseMessage('');
    mutate(formData, {
      onSuccess: () => setResponseMessage(successMsg),
      onError: (msg: string) => setResponseMessage(msg),
    });
  };

  return { responseMessage, isSubmitting, submit };
}

export default useSubmission;
