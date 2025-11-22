import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import ChangePasswordData from '../../types/ChangePasswordData';
import ServerError from '../../types/ServerError';
import useChangeUserPassword from '../../hooks/useChangeUserPassword';
import { useSnackbarStore } from '../../stores/snackbarStore';
import SnackbarProvider from '../SnackbarProvider';

function ChangeData() {
  const { isSuccess, isError, error, isPending, mutate } =
    useChangeUserPassword();
  const { openSnackbar } = useSnackbarStore();

  const [passForm, setPassForm] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    if (isSuccess) {
      openSnackbar('Password successfully changed!', 'success');
    } else if (isError) {
      const errMsg =
        (error as AxiosError<ServerError>)?.response?.data.message ||
        'Password change error';
      openSnackbar(errMsg, 'error');
    }
  }, [isSuccess, isError, error, openSnackbar]);

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
          mutate(passForm);
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
        <button className="btn-primary" type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Change Password'}
        </button>

        {/* komunikaty zastąpione snackbarami */}
      </form>

      <SnackbarProvider />
    </section>
  );
}

export default ChangeData;
