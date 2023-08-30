import Header from './Header';
import Form from './Form';

export default function Login() {
  return (
    <>
      <Header title={'Регистрация'} link={'/signup'} />
      <Form title={'Вход'} buttonText={'Войти'} />
    </>
  );
}
