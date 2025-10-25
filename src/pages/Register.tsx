import React, { useState } from 'react';
import NavBar from './../components/NavBar';
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
          <h1 className="register__title">Zarejestruj się</h1>
          <p className="register__subtitle">Utwórz konto CADR i rozpocznij tworzenie</p>
          <form className="register-form__form" onSubmit={handleSubmit}>
            <div className="register-form register-form--firstName">
              <label htmlFor="firstName" className="register-form__text">First Name</label>
              <input
                type="text"
                name="firstName"
                className="input form-first-name"
                placeholder="Jan"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form register-form--lastName">
              <label htmlFor="lastName" className="register-form__text">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="input form-last-name"
                placeholder="Kowalski"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form register-form--email">
              <label htmlFor="email" className="register-form__text">Email</label>
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
            <div className="register-form register-form--password">
              <label htmlFor="password" className="register-form__text">Password</label>
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
            <div className="register-form register-form--phoneNumber">
              <label htmlFor="phone" className="register-form__text">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className="input form-phone"
                placeholder="+48 123 456 789"
                value={formData.phoneNumber}
                onChange={handleChange}
                pattern="[0-9]{9,15}"
                required
              />
            </div>
            <button
              className="btn-primary btn-primary-register"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Registering...' : 'Register'}
            </button>
            <p className="register-form__content"> Masz już konto? <a href="/login" className="register-form__link">Zaloguj się</a></p>
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
