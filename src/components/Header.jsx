import { Link } from 'react-router-dom';

export default function Header({ title, link, email }) {
  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__container">
        <h2 className="header__email">{email}</h2>
        <Link to={link} className={`header__link ${email && 'header__link_auth'}`}>
          {title}
        </Link>
      </div>
    </header>
  );
}
