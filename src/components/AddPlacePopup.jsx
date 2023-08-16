import { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const inputName = useRef('');
  const inputLink = useRef('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [nameError, setNameError] = useState();
  const [linkError, setLinkError] = useState();
  const [resetSubmitButton, setResetSubmitButton] = useState(false);
  const errorClassName = `popup__error ${resetSubmitButton && 'popup__error_active'}`;

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
    setName('');
    setLink('');
  }
  function closePopup() {
    onClose();
    setName('');
    setLink('');
    setNameError('');
    setLinkError('');
  }
  //валидация
  function changeNameInput(e) {
    setName(e.target.value);
    e.target.checkValidity() && inputLink.current.checkValidity()
      ? setResetSubmitButton(false)
      : setResetSubmitButton(true);
    setNameError(e.target.validationMessage);
  }
  function changeLinkInput(e) {
    setLink(e.target.value);
    e.target.checkValidity() && inputName.current.checkValidity()
      ? setResetSubmitButton(false)
      : setResetSubmitButton(true);
    setLinkError(e.target.validationMessage);
  }

  useEffect(() => {
    if (isOpen) {
      inputName.current.checkValidity() && inputLink.current.checkValidity()
        ? setResetSubmitButton(false)
        : setResetSubmitButton(true);
    } else {
      setResetSubmitButton(false);
    }
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
        value={name}
        onChange={changeNameInput}
        ref={inputName}
      />
      <span className={errorClassName}>{nameError}</span>
      <input
        placeholder="Ссылка на картинку"
        type="url"
        className="popup__input"
        required
        value={link}
        onChange={changeLinkInput}
        ref={inputLink}
      />
      <span className={errorClassName}>{linkError}</span>
    </PopupWithForm>
  );
}
