import React, { useState, useEffect } from 'react';
import ChangeInfoData from '../../types/ChangeInfoData';
import useChangeUserInfo from '../../hooks/useChangeUserInfo';
import useUserStore from '../../stores/useUserStore';

function ChangeUserInfo() {
  const { isPending, mutate } = useChangeUserInfo();
  useUserStore((s) => s.setUser);
  const storeUser = useUserStore();

  const [infoForm, setInfoForm] = useState<ChangeInfoData>({
    firstName: '',
    lastName: '',
  });

  const fetchedUser = storeUser;

  useEffect(() => {
    if (fetchedUser) {
      setInfoForm({
        firstName: fetchedUser.firstName,
        lastName: fetchedUser.lastName,
      });
    }
  }, [fetchedUser]);

  if (isPending) return <p>Loading...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...infoForm, [name]: value } as ChangeInfoData;
    setInfoForm(updated);
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
      </form>
    </section>
  );
}

export default ChangeUserInfo;
