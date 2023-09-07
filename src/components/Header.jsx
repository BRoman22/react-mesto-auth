import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Burger from './Burger';

export default function Header({ email, signout }) {
  const [burgerMenu, setBurgerMenu] = useState(true);

  function handleClick() {
    setBurgerMenu(() => !burgerMenu);
  }

  function signoutAndCloseBurgerMenu() {
    signout();
    handleClick();
  }

  return (
    <>
      <div className={`burger__popup ${burgerMenu && 'burger__popup_hide'}`}>
        <h2 className={`header__email header__email_popup ${burgerMenu && 'header__email_hide'}`}>
          {email}
        </h2>
        <Link
          to="/signin"
          className={`header__link header__link_auth ${burgerMenu && 'header__link_hide'}`}
          onClick={signoutAndCloseBurgerMenu}
        >
          Выйти
        </Link>
      </div>
      <header className="header">
        <div className="header__logo" />
        <div className="header__container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Burger isOpen={burgerMenu} handleClick={handleClick} />
                  <h2 className="header__email header__email_unvisible">{email}</h2>
                  <Link
                    to="/signin"
                    className="header__link header__link_unvisible"
                    onClick={signout}
                  >
                    Выйти
                  </Link>
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <Link to="/signup" className="header__link">
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/signup"
              element={
                <Link to="/signin" className="header__link">
                  Войти
                </Link>
              }
            />
          </Routes>
        </div>
      </header>
    </>
  );
}
