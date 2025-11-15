import React, { useState } from 'react';
import { AxiosError } from 'axios';
import ChangePasswordData from '../../types/ChangePasswordData';
import ServerError from '../../types/ServerError';
import useChangeUserPassword from '../../hooks/useChangeUserPassword';

function ChangeData() {
  const passMut = useChangeUserPassword();

  const [passForm, setPassForm] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
  });

  const handleChange =
    <F extends object>(setter: React.Dispatch<React.SetStateAction<F>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setter((prev: F) => ({ ...prev, [name]: value }) as F);
    };

  return (
    <section className="l-section l-section--change-data">
      <h2 className="change-data__title">Change Password</h2>
      <form
        className="change-data-form__form"
        onSubmit={(e) => {
          e.preventDefault();
          passMut.mutate(passForm);
        }}
      >
        <div className="change-data-form">
          <label htmlFor="currentPassword" className="change-data-form__text">
            Current password
          </label>
          <input
            name="currentPassword"
            type="password"
            className="input"
            value={passForm.currentPassword}
            onChange={handleChange(setPassForm)}
            placeholder="••••••••"
            required
          />
        </div>
        <div className="change-data-form">
          <label htmlFor="newPassword" className="change-data-form__text">
            New password
          </label>
          <input
            name="newPassword"
            type="password"
            className="input"
            value={passForm.newPassword}
            onChange={handleChange(setPassForm)}
            placeholder="••••••••"
            required
          />
        </div>
        <button
          className="btn-primary"
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
    </section>
  );
}

export default ChangeData;
