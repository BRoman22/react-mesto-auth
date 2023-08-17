import { useEffect, useRef, useState, memo } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const inputName = useRef();
  const inputLink = useRef();
  const [error, setError] = useState({ name: '', link: '' });
  const [resetSubmitButton, setResetSubmitButton] = useState(false);
  const errorClassName = `popup__error ${resetSubmitButton && 'popup__error_active'}`;

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: inputName.current.value, link: inputLink.current.value });
    inputName.current.value = '';
    inputLink.current.value = '';
  }
  function closePopup() {
    onClose();
    inputName.current.value = '';
    inputLink.current.value = '';
    setError({ name: '', link: '' });
  }
  //валидация
  function getNameError() {
    setError({ ...error, name: inputName.current.validationMessage });
    validation();
  }
  function getLinkError() {
    setError({ ...error, link: inputLink.current.validationMessage });
    validation();
  }
  function validation() {
    inputName.current.checkValidity() && inputLink.current.checkValidity()
      ? setResetSubmitButton(false)
      : setResetSubmitButton(true);
  }
  useEffect(() => {
    isOpen ? validation() : setResetSubmitButton(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={closePopup}
      onSubmit={handleSubmit}
      isDisable={resetSubmitButton}
    >
      <input
        placeholder="Название"
        type="text"
        className="popup__input"
        minLength={2}
        maxLength={30}
        required
        onChange={getNameError}
        ref={inputName}
      />
      <span className={errorClassName}>{error.name}</span>
      <input
        placeholder="Ссылка на картинку"
        type="url"
        className="popup__input"
        required
        onChange={getLinkError}
        ref={inputLink}
      />
      <span className={errorClassName}>{error.link}</span>
    </PopupWithForm>
  );
}
