import { Link } from 'react-router-dom';

export default function Header({ title, link, email, signout }) {
  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__container">
        <h2 className="header__email">{email}</h2>
        <Link
          to={link}
          className={`header__link ${email && 'header__link_auth'}`}
          onClick={signout}
        >
          {title}
        </Link>
      </div>
    </header>
  );
}
