import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import ChangeInfoData from '../../types/ChangeInfoData';
import ServerError from '../../types/ServerError';
import { fetchUser } from '../../api/client';
import useChangeUserInfo from '../../hooks/useChangeUserInfo';
import { useSnackbarStore } from '../../stores/snackbarStore';
import useUserStore from '../../stores/useUserStore';
import SnackbarProvider from '../SnackbarProvider';

function ChangeUserInfo() {
  const { isSuccess, isError, error, isPending, mutate } = useChangeUserInfo();
  const { openSnackbar } = useSnackbarStore();
  const setUser = useUserStore((s) => s.setUser);

  const [infoForm, setInfoForm] = useState<ChangeInfoData>({
    firstName: '',
    lastName: '',
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
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      openSnackbar('Data successfully changed!', 'success');
    } else if (isError) {
      const errMsg =
        (error as AxiosError<ServerError>)?.response?.data.message ||
        'Data change error';
      openSnackbar(errMsg, 'error');
    }
  }, [isSuccess, isError, error, openSnackbar]);

  if (isLoading) return <p>Loading...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...infoForm, [name]: value } as ChangeInfoData;
    setInfoForm(updated);

    if (name === 'firstName' || name === 'lastName') {
      setUser({
        firstName: updated.firstName,
        lastName: updated.lastName,
        isLoggedIn: true,
        email: '',
        isEmailConfirmed: false,
      });
    }
  };

  return (
    <section className="l-section l-section--change-data">
      <h2 className="change-data__title">Change Name</h2>
      <form
        className="change-data-form__form"
        onSubmit={(e) => {
          e.preventDefault();
          mutate(infoForm);
        }}
      >
        <div className="change-data-form">
          <label htmlFor="firstName" className="change-data-form__text">
            First name
          </label>
          <input
            name="firstName"
            className="input"
            value={infoForm.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />
        </div>
        <div className="change-data-form">
          <label htmlFor="lastName" className="change-data-form__text">
            Last name
          </label>
          <input
            name="lastName"
            className="input"
            value={infoForm.lastName}
            onChange={handleChange}
            placeholder="Smith"
            required
          />
        </div>
        <button className="btn-primary" type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Change Data'}
        </button>

        <SnackbarProvider />
      </form>
    </section>
  );
}

export default ChangeUserInfo;
