import React, { useState, useEffect } from 'react';
import ChangeEmailData from '../../types/ChangeEmailData';
import useChangeUserEmail from '../../hooks/useChangeUserEmail';
import useUserStore from '../../stores/useUserStore';

function ChangeUserEmail() {
  const { isPending, mutate } = useChangeUserEmail();
  const user = useUserStore();

  const [emailForm, setEmailForm] = useState<ChangeEmailData>({ newEmail: '' });

  useEffect(() => {
    if (user) {
      setEmailForm({
        newEmail: user.email,
      });
    }
  }, [user]);

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
      </form>
    </section>
  );
}

export default ChangeUserEmail;
