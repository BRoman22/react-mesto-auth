import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Burger from './Burger';

export default function Header({ email, signout }) {
  const { pathname } = useLocation();
  const [popup, setPopup] = useState(true);

  function handleClick() {
    setPopup(() => !popup);
  }

  function signoutAndClosePopup() {
    signout();
    handleClick();
  }

  return (
    <>
      {!popup && (
        <div className="burger__popup">
          <h2 className="header__email header__email_popup">{email}</h2>
          <Link
            to="/signin"
            className="header__link header__link_auth"
            onClick={signoutAndClosePopup}
          >
            Выйти
          </Link>
        </div>
      )}
      <header className="header">
        <div className="header__logo" />
        <div className="header__container">
          {pathname === '/' && (
            <>
              <Burger isOpen={popup} handleClick={handleClick} />
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
