import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import logo from './../assets/logo.png';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
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
    <div className="container">
      <NavBar />
      <div className="l-section l-section--register">
        <div className="register-hld">
          <img className="logo" src={logo} height="125px" />
          <form>
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
    </div>
  );
}

export default Register;
