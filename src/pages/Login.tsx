import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import useLogin from '../hooks/useLogin';
import loginData from '../types/LoginData';
import useRedirectIfAuthenticated from '../hooks/useRedirectIfAuthenticated';
import SnackbarProvider from '../components/SnackbarProvider';
import { useSnackbarStore } from '../stores/snackbarStore';
import useLoginWithGithub from '../hooks/useLoginWithGithub.ts';

function Login() {
  const { mutate, isPending } = useLogin();
  const loginWithGithub = useLoginWithGithub();
  useSnackbarStore();
  const [formData, setFormData] = useState<loginData>({
    email: '',
    password: '',
  });

  useRedirectIfAuthenticated();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="l-section l-section--login">
        <div className="login-hld">
          <h1 className="login__title">Log in</h1>
          <p className="login__subtitle">Access the CADR panel</p>
          <form className="login-form__form" onSubmit={handleSubmit}>
            <div className="login-form login-form--email">
              <label htmlFor="email" className="login-form__text">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="input form-email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-form login-form--password">
              <label htmlFor="password" className="login-form__text">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="input form-password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="btn-primary btn-primary-login"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>
            <button
              className="btn-primary btn-primary-login btn-github"
              type="button"
              onClick={loginWithGithub}
              disabled={isPending}
              aria-label="Continue with GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.091-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
              {isPending ? 'Logging in...' : 'Continue with GitHub'}
            </button>
            <p className="login-form__content">
              {' '}
              Don't have an account?{' '}
              <a href="/register" className="login-form__link">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
      <SnackbarProvider />
    </div>
  );
}

export default Login;
