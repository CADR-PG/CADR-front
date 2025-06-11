import { useSearchParams } from 'react-router-dom';
import useResend from '../hooks/useResend';
import NavBar from '../components/NavBar';
import SnackbarProvider from '../components/SnackbarProvider';

function RegistrationSuccessful() {
  const [searchParams] = useSearchParams();
  const { mutate } = useResend();

  const resendCode = () => {
    mutate(searchParams.get('email')!);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="l-section l-section--registration-successful">
        <div className="registration-successful-hld">
          <h1>Check your inbox!</h1>
          <p>We've sent you an email to activate your account!</p>
          <p>
            Don't see anything?
            <a onClick={resendCode}> Request again</a>
          </p>
          <SnackbarProvider />
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccessful;
