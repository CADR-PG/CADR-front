import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import logo from './../assets/logo.png';
import useRegister from '../hooks/useRegister';
import registerData from '../types/RegisterData';
import { AxiosError } from 'axios';
import ServerError from '../types/ServerError';

function Register() {
  const [formData, setFormData] = useState<registerData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const { mutate, error, isError, isPending } = useRegister(formData.email);

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
      <div className="l-section l-section--register">
        <div className="register-hld">
          <img className="logo" src={logo} height="125px" alt="Logo" />
          <form className="register-form__form" onSubmit={handleSubmit}>
            <div className="register-form register-form--firstName">
              <label className="register-form__text">First Name</label>
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
              <label className="register-form__text">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form register-form--email">
              <label className="register-form__text">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form register-form--password">
              <label className="register-form__text">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form register-form--phoneNumber">
              <label className="register-form__text">Phone Number</label>
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
            <button
              className="register-form__btn"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Registering...' : 'Register'}
            </button>
          </form>
          {isError && (
            <p className="register-form-error__text">
              {(error as AxiosError<ServerError>).response?.data.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
