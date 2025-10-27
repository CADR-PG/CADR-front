import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import ChangeEmailData from '../../types/ChangeEmailData';
import ServerError from '../../types/ServerError';
import { fetchUser } from '../../api/client';
import useChangeUserEmail from '../../hooks/useChangeUserEmail';

function ChangeData() {
  const emailMut = useChangeUserEmail();
  
  const [emailForm, setEmailForm] = useState<ChangeEmailData>({ newEmail: '' });

  const { data: userResponse, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: fetchUser,
    retry: false,
  });
  const user = userResponse?.data;

  useEffect(() => {
    if (user) {
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
    <section className="l-section l-section--change-data">
      <h2 className="change-data__title">Change Email</h2>
      <form
        className="change-data-form__form"
        onSubmit={(e) => {
          e.preventDefault();
          emailMut.mutate(emailForm);
        }}
      >
        <div className="change-data-form">
          <label htmlFor="email" className="change-data-form__text">New Email</label>
          <input
            name="email"
            type="email"
            className="input"
            value={emailForm.newEmail}
            onChange={handleChange(setEmailForm)}
            placeholder="New Email"
            required
          />
        </div>
        <button
          className="btn-primary"
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
    </section>
  );
}

export default ChangeData;
