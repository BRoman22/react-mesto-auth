export default function Form({ title, buttonText }) {
  return (
    <form className="form">
      <h2 className="form__title">{title}</h2>
      <input className="form__input" placeholder="Email" />
      <input className="form__input" placeholder="Пароль" />
      <button className="popup__button popup__button_form">{buttonText}</button>
    </form>
  );
}
