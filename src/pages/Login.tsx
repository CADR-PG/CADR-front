import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import useLogin from '../hooks/useLogin';
import loginData from '../types/LoginData';
import SnackbarProvider from '../components/SnackbarProvider';
import { useSnackbarStore } from '../stores/snackbarStore';

function Login() {
  const { mutate, isPending } = useLogin();
  useSnackbarStore();
  const [formData, setFormData] = useState<loginData>({
    email: '',
    password: '',
  });

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
