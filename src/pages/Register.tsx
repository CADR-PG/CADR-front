import React, { useState } from 'react';
import logo from './../assets/logo.png';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://cadr-pg.github.io/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Success: ${data.message}`);
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setResponseMessage(
        `Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`,
      );
    }
  };

  return (
    <div className="l-section l-section--register">
      <div className="register-hld">
        <img className="logo" src={logo} height="125px" />
        <form onSubmit={handleSubmit}>
          <div className="register-form register-form--lastName">
            <label className="register-form__text register-form--firstName__text">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form register-form--lastName">
            <label className="register-form__text register-form--lastName__text">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form register-form--lastName">
            <label className="register-form__text register-form--mail__text">
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
          <div className="register-form register-form--lastName">
            <label className="register-form__text register-form--password__text">
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
          <div className="register-form register-form--lastName">
            <label className="register-form__text register-form--phone__text">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              className="input"
              value={formData.phoneNumber}
              onChange={handleChange}
              pattern="[0-9]{9,15}"
              required
            />
          </div>
          <button className="register-form__btn" type="submit">
            Register
          </button>
        </form>
        {responseMessage && (
          <p className="register-form-error__text">{responseMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
