import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import NavBar from '../components/NavBar';
import logo from '../assets/logo.png';
import ChangeInfoData from '../types/ChangeInfoData';
import ChangeEmailData from '../types/ChangeEmailData';
import ChangePasswordData from '../types/ChangePasswordData';
import ServerError from '../types/ServerError';
import { fetchUser } from '../api/client';
import useChangeUserInfo from '../hooks/useChangeUserInfo';
import useChangeUserEmail from '../hooks/useChangeUserEmail';
import useChangeUserPassword from '../hooks/useChangeUserPassword';

function ChangeData() {
  const infoMut = useChangeUserInfo();
  const emailMut = useChangeUserEmail();
  const passMut = useChangeUserPassword();

  const [infoForm, setInfoForm] = useState<ChangeInfoData>({
    firstName: '',
    lastName: '',
  });
  const [emailForm, setEmailForm] = useState<ChangeEmailData>({ newEmail: '' });
  const [passForm, setPassForm] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
  });

  const { data: userResponse, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: fetchUser,
    retry: false,
  });
  const user = userResponse?.data;

  useEffect(() => {
    if (user) {
      setInfoForm({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      setEmailForm({ newEmail: user.email });
    }
  }, [user]);

  if (isLoading) return <p>Loading...</p>;

  const handleChange =
    <F extends object>(setter: React.Dispatch<React.SetStateAction<F>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setter((prev: F) => ({ ...prev, [name]: value }) as F);
    };

  return (
    <div className="container">
      <NavBar />
      <div className="l-section l-section--change-data">
        <div className="change-data-hld">
          <img className="logo" src={logo} height="125px" alt="Logo" />

          <h2>Change Name</h2>
          <form
            className="change-data-form__form"
            onSubmit={(e) => {
              e.preventDefault();
              infoMut.mutate(infoForm);
            }}
          >
            <div className="change-data-form change-data-form--email">
              <label className="change-data-form__text">First name</label>
              <input
                name="firstName"
                className="input"
                value={infoForm.firstName}
                onChange={handleChange(setInfoForm)}
                placeholder="FirstName"
                required
              />
            </div>
            <div className="change-data-form change-data-form--password">
              <label className="change-data-form__text">Last name</label>
              <input
                name="lastName"
                className="input"
                value={infoForm.lastName}
                onChange={handleChange(setInfoForm)}
                placeholder="LastName"
                required
              />
            </div>
            <button
              className="change-data-form__btn"
              type="submit"
              disabled={infoMut.isPending}
            >
              {infoMut.isPending ? 'Sending...' : 'Change Data'}
            </button>
            {infoMut.isSuccess && (
              <p className="change-data-form-success__text">
                Data successfully changed!
              </p>
            )}
            {infoMut.isError && (
              <p className="change-data-form-error__text">
                {(infoMut.error as AxiosError<ServerError>)?.response?.data
                  .message || 'Data change error'}
              </p>
            )}
          </form>

          <h2>Change Email</h2>
          <form
            className="change-data-form__form"
            onSubmit={(e) => {
              e.preventDefault();
              emailMut.mutate(emailForm);
            }}
          >
            <div className="change-data-form change-data-form--email">
              <label className="change-data-form__text">New Email</label>
              <input
                name="newEmail"
                type="email"
                className="input"
                value={emailForm.newEmail}
                onChange={handleChange(setEmailForm)}
                placeholder="New Email"
                required
              />
            </div>
            <button
              className="change-data-form__btn"
              type="submit"
              disabled={emailMut.isPending}
            >
              {emailMut.isPending ? 'Sending...' : 'Change Email'}
            </button>
            {emailMut.isSuccess && (
              <p className="change-data-form-success__text">
                Email successfully changed!
              </p>
            )}
            {emailMut.isError && (
              <p className="change-data-form-error__text">
                {(emailMut.error as AxiosError<ServerError>)?.response?.data
                  .message || 'Email change error'}
              </p>
            )}
          </form>

          <h2>Change Password</h2>
          <form
            className="change-data-form__form"
            onSubmit={(e) => {
              e.preventDefault();
              passMut.mutate(passForm);
            }}
          >
            <div className="change-data-form change-data-form--password">
              <label className="change-data-form__text">Current password</label>
              <input
                name="currentPassword"
                type="password"
                className="input"
                value={passForm.currentPassword}
                onChange={handleChange(setPassForm)}
                placeholder="Current Password"
                required
              />
            </div>
            <div className="change-data-form change-data-form--password">
              <label className="change-data-form__text">New password</label>
              <input
                name="newPassword"
                type="password"
                className="input"
                value={passForm.newPassword}
                onChange={handleChange(setPassForm)}
                placeholder="New Password"
                required
              />
            </div>
            <button
              className="change-data-form__btn"
              type="submit"
              disabled={passMut.isPending}
            >
              {passMut.isPending ? 'Sending...' : 'Change Password'}
            </button>
            {passMut.isSuccess && (
              <p className="change-data-form-success__text">
                Password successfully changed!
              </p>
            )}
            {passMut.isError && (
              <p className="change-data-form-error__text">
                {(passMut.error as AxiosError<ServerError>)?.response?.data
                  .message || 'Password change error'}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangeData;
