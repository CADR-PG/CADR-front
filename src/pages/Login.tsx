import React, { useState } from 'react';
import logo from './../assets/logo.png';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="l-section l-section--login">
      <div className="login-hld">
        <img className="logo" src={logo} height="125px" />
        <form>
          <div className="login-form login-form--lastName">
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
          <div className="login-form login-form--lastName">
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
          <button className="login-form__btn" type="submit">
            Login
          </button>
        </form>
        {responseMessage && (
          <p className="login-form-error__text">{responseMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
