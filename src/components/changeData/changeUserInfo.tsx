import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import ChangeInfoData from '../../types/ChangeInfoData';
import ServerError from '../../types/ServerError';
import { fetchUser } from '../../api/client';
import useChangeUserInfo from '../../hooks/useChangeUserInfo';

function ChangeData() {
  const infoMut = useChangeUserInfo();

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

  if (isLoading) return <p>Loading...</p>;

  const handleChange =
    <F extends object>(setter: React.Dispatch<React.SetStateAction<F>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setter((prev: F) => ({ ...prev, [name]: value }) as F);
    };

  return (
    <section className="l-section l-section--change-data">
      <h2 className="change-data__title">Change Name</h2>
      <form
        className="change-data-form__form"
        onSubmit={(e) => {
          e.preventDefault();
          infoMut.mutate(infoForm);
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
            onChange={handleChange(setInfoForm)}
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
            onChange={handleChange(setInfoForm)}
            placeholder="Smith"
            required
          />
        </div>
        <button
          className="btn-primary"
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
    </section>
  );
}

export default ChangeData;
