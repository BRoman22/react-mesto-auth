import { useState } from 'react';

export default function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">{'Вход'}</h2>
      <input
        name="email"
        type="email"
        className="form__input"
        placeholder="Email"
        value={formValue.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        autoComplete="off"
        className="form__input"
        placeholder="Пароль"
        value={formValue.password}
        onChange={handleChange}
      />
      <button className="popup__button popup__button_form">{'Войти'}</button>
    </form>
  );
}
