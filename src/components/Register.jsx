import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
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
    onRegister(email, password);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">{'Регистрация'}</h2>
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
        <button className="popup__button popup__button_form">{'Зарегистрироваться'}</button>
      </form>
      <Link className="link" to="/signin">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
}
