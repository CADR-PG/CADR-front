import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import logo from './../assets/logo.png';
import useSubmission from './../hooks/useSubmission';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { responseMessage, isSubmitting, submit } =
    useSubmission('/users/login');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(formData, 'Login successful!');
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
