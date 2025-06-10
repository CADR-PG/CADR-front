import { useState } from "react";
import OtpInput from 'react-otp-input';
import { useSearchParams } from "react-router-dom";
import useResend from "../hooks/useResend";
import useVerify from "../hooks/useVerify";
import VerifyData from "../types/VerifyData";

function EmailConfirmation() {
  const [otp, setOtp] = useState('');
  const [searchParams, ] = useSearchParams();
  const resend = useResend();
  const verify = useVerify();

  const resendCode = () => {
    console.log(searchParams);
    resend.mutate(searchParams.get("email")!);
  }

  const verifyCode = () => {
    const data: VerifyData = {
      email: searchParams.get("email")!,
      code: parseInt(otp)
    }
    verify.mutate(data);
  }
  
  return (
    <div className="l-section l-section--email-confirmation">
      <div className="email-confirmation-hld">
        <div className="">
          <h1>Verify</h1>
          <p>Your code was sent to you via email</p>
        </div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="otp-sep">-</span>}
          renderInput={(props) => <input {...props} className="otp-input" />}
          containerStyle="otp-hld"
        />
        <input
          onClick={verifyCode}
          type="button"
          value="Verify"
          className="email-confirmation__btn" />
        <p>
             Didn't receive code?
          <a onClick={resendCode} className="email-confirmation__resend"> Request again</a>
        </p>
      </div>
    </div>
  );
}

export default EmailConfirmation;
