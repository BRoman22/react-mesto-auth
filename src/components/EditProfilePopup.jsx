import { useState, useEffect, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const inputName = useRef();
  const inputAbout = useRef();
  const [error, setError] = useState({ name: '', about: '' });
  const [resetSubmitButton, setResetSubmitButton] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  const errorClassName = `popup__error ${resetSubmitButton && 'popup__error_active'}`;

  useEffect(() => {
    inputName.current.value = currentUser.name;
    inputAbout.current.value = currentUser.about;
  }, [currentUser]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: inputName.current.value, about: inputAbout.current.value });
  }
  function closePopup() {
    onClose();
    inputName.current.value = currentUser.name;
    inputAbout.current.value = currentUser.about;
    setError({ name: '', about: '' });
  }
  //валидация
  function getNameError() {
    setError({ ...error, name: inputName.current.validationMessage });
    validation();
  }
  function getAboutError() {
    setError({ ...error, about: inputAbout.current.validationMessage });
    validation();
  }
  function validation() {
    inputName.current.checkValidity() && inputAbout.current.checkValidity()
      ? setResetSubmitButton(false)
      : setResetSubmitButton(true);
  }
  useEffect(() => {
    isOpen ? validation() : setResetSubmitButton(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={closePopup}
      onSubmit={handleSubmit}
      isDisable={resetSubmitButton}
    >
      <input
        placeholder="Введите имя"
        type="text"
        className="popup__input"
        minLength={2}
        maxLength={40}
        required
        onChange={getNameError}
        ref={inputName}
      />
      <span className={errorClassName}>{error.name}</span>
      <input
        placeholder="О себе"
        type="text"
        className="popup__input"
        minLength={2}
        maxLength={200}
        required
        onChange={getAboutError}
        ref={inputAbout}
      />
      <span className={errorClassName}>{error.about}</span>
    </PopupWithForm>
  );
}
