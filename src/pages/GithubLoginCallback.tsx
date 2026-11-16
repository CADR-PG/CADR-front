import NavBar from '../components/NavBar';
import SnackbarProvider from '../components/SnackbarProvider';
import useLoginWithGithubCodeCallback from '../hooks/useLoginWithGithubCodeCallback.ts';
import useLoginWithGithub from '../hooks/useLoginWithGithub.ts';

export default function GithubLoginCallback() {
  const { status, errorMessage } = useLoginWithGithubCodeCallback();
  const retry = useLoginWithGithub();

  return (
    <div className="container">
      <NavBar />
      <div className="l-section l-section--login">
        <div className="login-hld oauth-callback" role="status">
          {status === 'loading' ? (
            <>
              <span className="spinner spinner--large" aria-hidden="true" />
              <h1 className="login__title">Signing you in...</h1>
              <p className="login__subtitle">Verifying your GitHub account</p>
            </>
          ) : (
            <>
              <h1 className="login__title">GitHub login failed</h1>
              <p className="oauth-callback__error" role="alert">
                {errorMessage}
              </p>
              <div className="oauth-callback__actions">
                <button
                  type="button"
                  className="btn-primary btn-primary-login"
                  onClick={retry}
                >
                  Try again
                </button>
                <a href="/login" className="login-form__link">
                  Back to login
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      <SnackbarProvider />
    </div>
  );
}
