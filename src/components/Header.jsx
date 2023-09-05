import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Burger from './Burger';

export default function Header({ email, signout }) {
  const { pathname } = useLocation();
  const [burgerMenu, setBurgerMenu] = useState(true);

  function handleClick() {
    setBurgerMenu(() => !burgerMenu);
  }

  function signoutAndClosePopup() {
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
          onClick={signoutAndClosePopup}
        >
          Выйти
        </Link>
      </div>
      <header className="header">
        <div className="header__logo" />
        <div className="header__container">
          {pathname === '/' && (
            <>
              <Burger isOpen={burgerMenu} handleClick={handleClick} />
              <h2 className="header__email header__email_unvisible">{email}</h2>
              <Link to="/signin" className="header__link header__link_unvisible" onClick={signout}>
                Выйти
              </Link>
            </>
          )}
          {pathname === '/signin' && (
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          )}
          {pathname === '/signup' && (
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
