import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import logo from './../assets/logo.png';
import useLogin from '../hooks/useLogin';
import loginData from '../types/LoginData';
import { AxiosError } from 'axios';
import ServerError from '../types/ServerError';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRedirectIfAuthenticated from '../hooks/useRedirectIfAuthenticated';

function Login() {
  const { mutate, error, isError, isPending } = useLogin();
  const [formData, setFormData] = useState<loginData>({
    email: '',
    password: '',
  });

  useRedirectIfAuthenticated();

  const { data: userResponse, isLoading: meLoading } = useQuery({
    queryKey: ['me'],
    queryFn: fetchUser,
    retry: false,
  });
  const user = userResponse?.data;
  const navigate = useNavigate();
  useEffect(() => {
    if (!meLoading && user) navigate('/');
  }, [meLoading, user, navigate]);

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
          <img className="logo" src={logo} height="125px" alt="Logo" />
          <form className="login-form__form" onSubmit={handleSubmit}>
            <div className="login-form login-form--email">
              <label className="login-form__text">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-form login-form--password">
              <label className="login-form__text">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="login-form__btn"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {isError && (
            <p className="login-form-error__text">
              {(error as AxiosError<ServerError>).response?.data.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
