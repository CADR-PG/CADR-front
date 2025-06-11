import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useSearchParams } from 'react-router-dom';
import useResend from '../hooks/useResend';
import useVerify from '../hooks/useVerify';
import VerifyData from '../types/VerifyData';
import SnackbarProvider from '../components/SnackbarProvider';
import { useSnackbarStore } from '../stores/snackbarStore';
import NavBar from '../components/NavBar';

function EmailConfirmation() {
  const { openSnackbar } = useSnackbarStore();
  const [otp, setOtp] = useState('');
  const [searchParams] = useSearchParams();
  const resend = useResend();
  const verify = useVerify();

  useEffect(() => {
    if (searchParams.get('email') && searchParams.get('code')) {
      const email: string = searchParams.get('email')!;
      const code: string = searchParams.get('code')!;
      const data: VerifyData = {
        email: email,
        code: parseInt(code),
      };

      verify.mutate(data);
    }
  });

  const resendCode = () => {
    console.log(searchParams);
    resend.mutate(searchParams.get('email')!);
  };

  const verifyCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchParams.get('email')) {
      const data: VerifyData = {
        email: searchParams.get('email')!,
        code: parseInt(otp),
      };

      verify.mutate(data);
    } else {
      openSnackbar(
        'Something went wrong. Try using the link inside the email.',
        'error',
      );
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="l-section l-section--email-confirmation">
        <div className="email-confirmation-hld">
          <div className="">
            <h1>Verify</h1>
            <p>Paste the code that was sent to you in the email!</p>
          </div>
          <form onSubmit={verifyCode}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="otp-sep">-</span>}
              renderInput={(props) => (
                <input {...props} className="otp-input" />
              )}
              containerStyle="otp-hld"
            />
            <button
              type="submit"
              disabled={verify.isPending}
              className="email-confirmation__btn"
            >
              {verify.isPending ? 'Verifying...' : 'Verify'}
            </button>
          </form>
          <p>
            Didn't receive code?
            <a onClick={resendCode} className="email-confirmation__resend">
              {' '}
              Request again
            </a>
          </p>
        </div>
        <SnackbarProvider />
      </div>
    </div>
  );
}

export default EmailConfirmation;
