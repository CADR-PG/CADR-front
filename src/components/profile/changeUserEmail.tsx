import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import ChangeEmailData from '../../types/ChangeEmailData';
import ServerError from '../../types/ServerError';
import { fetchUser } from '../../api/client';
import useChangeUserEmail from '../../hooks/useChangeUserEmail';
import { useSnackbarStore } from '../../stores/snackbarStore';
import SnackbarProvider from '../SnackbarProvider';

function ChangeUserEmail() {
  const { isSuccess, isError, error, isPending, mutate } = useChangeUserEmail();
  const { openSnackbar } = useSnackbarStore();

  const [emailForm, setEmailForm] = useState<ChangeEmailData>({ newEmail: '' });

  const { data: userResponse, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: fetchUser,
    retry: false,
  });
  const user = userResponse?.data;

  useEffect(() => {
    if (user) {
      setEmailForm({
        newEmail: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      openSnackbar('Email successfully changed!', 'success');
    } else if (isError) {
      const errMsg =
        (error as AxiosError<ServerError>)?.response?.data.message ||
        'Email change error';
      openSnackbar(errMsg, 'error');
    }
  }, [isSuccess, isError, error, openSnackbar]);

  if (isLoading) return <p>Loading...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEmailForm((prev) => ({ ...prev, newEmail: value }));
  };

  return (
    <section className="l-section l-section--change-data">
      <h2 className="change-data__title">Change Email</h2>
      <form
        className="change-data-form__form"
        onSubmit={(e) => {
          e.preventDefault();
          mutate(emailForm);
        }}
      >
        <div className="change-data-form">
          <label htmlFor="newEmail" className="change-data-form__text">
            New Email
          </label>
          <input
            id="newEmail"
            name="newEmail"
            type="email"
            className="input"
            value={emailForm.newEmail}
            onChange={handleChange}
            placeholder="New Email"
            required
          />
        </div>
        <button className="btn-primary" type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Change Email'}
        </button>

        <SnackbarProvider />
      </form>
    </section>
  );
}

export default ChangeUserEmail;
