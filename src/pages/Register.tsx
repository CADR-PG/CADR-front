import React, { useState } from 'react';
import NavBar from './../components/NavBar';
import logo from './../assets/logo.png';
import { post } from './../api/client';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
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
      const response = await post('/users/register', formData);
      setResponseMessage('Registration successful!');
      console.log('Response:', response);
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setResponseMessage(
          axiosError.response?.data?.message ||
            'Registration failed. Please try again.',
        );
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
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
