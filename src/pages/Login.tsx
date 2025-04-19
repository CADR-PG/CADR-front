import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import logo from './../assets/logo.png';
import { post } from './../api/client';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');

    try {
      const response = await post('/users/login', formData);
      setResponseMessage('Login successful!');
      console.log('Response:', response);
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string }; status?: number };
        };
        if (axiosError.response?.data?.message) {
          setResponseMessage(axiosError.response.data.message);
        } else if (axiosError.response?.status === 401) {
          setResponseMessage('Invalid email or password.');
        } else if (axiosError.response?.status === 500) {
          setResponseMessage('Server error. Please try again later.');
        } else {
          setResponseMessage('Login failed. Please try again.');
        }
      } else {
        setResponseMessage('An unexpected error occurred. Please try again.');
      }
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="l-section l-section--login">
        <div className="login-hld">
          <img className="logo" src={logo} height="125px" alt="Logo" />
          <form className="login-form__form" onSubmit={handleSubmit}>
            <div className="login-form login-form--email">
              <label className="login-form__text login-form--mail__text">
                Email
              </label>
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
              <label className="login-form__text login-form--password__text">
                Password
              </label>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {responseMessage && (
            <p className="login-form-error__text">{responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
