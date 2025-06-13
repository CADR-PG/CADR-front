import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NavBar from '../components/NavBar';
import logo from '../assets/logo.png';
import {
  fetchUser,
  changeUserInfo,
  changeUserEmail,
  changeUserPassword,
} from '../api/client';
import ChangeInfoData from '../types/ChangeInfoData';
import ChangeEmailData from '../types/ChangeEmailData';
import ChangePasswordData from '../types/ChangePasswordData';

function ChangeData() {
  const qc = useQueryClient();

  // pobranie aktualnego usera
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: fetchUser,
  });

  // mutacje
  const infoMut = useMutation({
    mutationFn: changeUserInfo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['me'] }),
  });
  const emailMut = useMutation({
    mutationFn: changeUserEmail,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['me'] }),
  });
  const passMut = useMutation({
    mutationFn: changeUserPassword,
  });

  const [infoForm, setInfoForm] = useState<ChangeInfoData>({
    firstName: '',
    lastName: '',
  });
  const [emailForm, setEmailForm] = useState<ChangeEmailData>({ newEmail: '' });
  const [passForm, setPassForm] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    if (user?.data) {
      setInfoForm({
        firstName: user.data.firstName,
        lastName: user.data.lastName,
      });
      setEmailForm({ newEmail: user.data.email });
    }
  }, [user]);

  if (isLoading) return <p>Ładowanie…</p>;

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

          <h2>Zmiana Imienia i Nazwiska</h2>
          <form
            className="change-data-form__form"
            onSubmit={(e) => {
              e.preventDefault();
              infoMut.mutate(infoForm);
            }}
          >
            <div className="change-data-form change-data-form--email">
              <label className="change-data-form__text">Imię</label>
              <input
                name="firstName"
                className="input"
                value={infoForm.firstName}
                onChange={handleChange(setInfoForm)}
                placeholder="Imię"
                required
              />
            </div>
            <div className="change-data-form change-data-form--password">
              <label className="change-data-form__text">Nazwisko</label>
              <input
                name="lastName"
                className="input"
                value={infoForm.lastName}
                onChange={handleChange(setInfoForm)}
                placeholder="Nazwisko"
                required
              />
            </div>
            <button
              className="change-data-form__btn"
              type="submit"
              disabled={infoMut.isPending}
            >
              {infoMut.isPending ? 'Wysyłam…' : 'Zmień dane'}
            </button>
            {infoMut.isError && (
              <p className="change-data-form-error__text">Błąd zmiany danych</p>
            )}
          </form>

          <h2>Zmiana Emaila</h2>
          <form
            className="change-data-form__form"
            onSubmit={(e) => {
              e.preventDefault();
              emailMut.mutate(emailForm);
            }}
          >
            <div className="change-data-form change-data-form--email">
              <label className="change-data-form__text">Nowy Email</label>
              <input
                name="newEmail"
                type="email"
                className="input"
                value={emailForm.newEmail}
                onChange={handleChange(setEmailForm)}
                placeholder="Nowy Email"
                required
              />
            </div>
            <button
              className="change-data-form__btn"
              type="submit"
              disabled={emailMut.isPending}
            >
              {emailMut.isPending ? 'Wysyłam…' : 'Zmień email'}
            </button>
            {emailMut.isError && (
              <p className="change-data-form-error__text">Błąd zmiany emaila</p>
            )}
          </form>

          <h2>Zmiana Hasła</h2>
          <form
            className="change-data-form__form"
            onSubmit={(e) => {
              e.preventDefault();
              passMut.mutate(passForm);
            }}
          >
            <div className="change-data-form change-data-form--password">
              <label className="change-data-form__text">Aktualne hasło</label>
              <input
                name="currentPassword"
                type="password"
                className="input"
                value={passForm.currentPassword}
                onChange={handleChange(setPassForm)}
                placeholder="Aktualne hasło"
                required
              />
            </div>
            <div className="change-data-form change-data-form--password">
              <label className="change-data-form__text">Nowe hasło</label>
              <input
                name="newPassword"
                type="password"
                className="input"
                value={passForm.newPassword}
                onChange={handleChange(setPassForm)}
                placeholder="Nowe hasło"
                required
              />
            </div>
            <button
              className="change-data-form__btn"
              type="submit"
              disabled={passMut.isPending}
            >
              {passMut.isPending ? 'Wysyłam…' : 'Zmień hasło'}
            </button>
            {passMut.isError && (
              <p className="change-data-form-error__text">Błąd zmiany hasła</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangeData;
