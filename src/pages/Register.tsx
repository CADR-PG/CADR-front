import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import useRegister from '../hooks/useRegister';
import registerData from '../types/RegisterData';
import useRedirectIfAuthenticated from '../hooks/useRedirectIfAuthenticated';
import SnackbarProvider from '../components/SnackbarProvider';

function Register() {
  const [formData, setFormData] = useState<registerData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const { mutate, isPending } = useRegister(formData.email);

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
      <div className="l-section l-section--register">
        <div className="register-hld">
          <h1 className="register__title">Sign up</h1>
          <p className="register__subtitle">
            Create a CADR account and start creating
          </p>
          <form className="register-form__form" onSubmit={handleSubmit}>
            <div className="register-form register-form--firstName">
              <label htmlFor="firstName" className="register-form__text">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="input form-first-name"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form register-form--lastName">
              <label htmlFor="lastName" className="register-form__text">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="input form-last-name"
                placeholder="Smith"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form register-form--email">
              <label htmlFor="email" className="register-form__text">
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
            <div className="register-form register-form--password">
              <label htmlFor="password" className="register-form__text">
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
            <div className="register-form register-form--phoneNumber">
              <label htmlFor="phone" className="register-form__text">
                Phone Number
              </label>
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
            <p className="register-form__content">
              {' '}
              Do you already have an account?{' '}
              <a href="/login" className="register-form__link">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
      <SnackbarProvider />
    </div>
  );
}

export default Register;
