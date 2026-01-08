import { Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';

function OAuthTest() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      try {
        const res = await fetch('/api/users/google-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: codeResponse.code,
          }),
        });
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
    flow: 'auth-code',
  });
  return <Button onClick={() => googleLogin()}>Google login</Button>;
}

export default OAuthTest;
