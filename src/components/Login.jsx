import { useForm } from 'react-hook-form';

export default function Login({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', defaultValues: { email: '', password: '' } });

  function onSubmit({ email, password }) {
    onLogin(email, password);
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__title">{'Вход'}</h2>
      <input
        className="form__input"
        placeholder="Email"
        {...register('email', {
          required: 'Заполните это поле.',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Введите Email.',
          },
        })}
      />
      <span className="popup__error">{errors.email?.message}</span>
      <input
        type="password"
        className="form__input"
        placeholder="Пароль"
        {...register('password', {
          required: 'Заполните это поле.',
          minLength: { value: 4, message: 'Пароль должен быть не короче 4 симв.' },
        })}
      />
      <span className="popup__error">{errors.password?.message}</span>
      <button className="popup__button popup__button_form">{'Войти'}</button>
    </form>
  );
}
