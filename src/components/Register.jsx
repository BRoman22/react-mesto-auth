import { Link } from 'react-router-dom';
import Header from './Header';
import Form from './Form';

export default function Register() {
  return (
    <>
      <Header title={'Войти'} link={'/signin'} />
      <Form title={'Регистрация'} buttonText={'Зарегистрироваться'} />
      <Link className="link" to="/signin">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
}
