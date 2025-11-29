import React, { useState } from 'react';
import ChangePasswordData from '../../types/ChangePasswordData';
import useChangeUserPassword from '../../hooks/useChangeUserPassword';

function ChangeUserPassword() {
  const { isPending, mutate } = useChangeUserPassword();

  const [passForm, setPassForm] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassForm((prev) => ({ ...prev, [name]: value }) as ChangePasswordData);
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
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>
        <button className="btn-primary" type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Change Password'}
        </button>
      </form>
    </section>
  );
}

export default ChangeUserPassword;
