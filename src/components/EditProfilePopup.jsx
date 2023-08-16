import { useState, useEffect, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const inputName = useRef();
  const inputDescription = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [resetSubmitButton, setResetSubmitButton] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  const errorClassName = `popup__error ${resetSubmitButton && 'popup__error_active'}`;

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }
  function closePopup() {
    onClose();
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameError('');
    setDescriptionError('');
  }
  //валидация
  function changeNameInput(e) {
    setName(e.target.value);
    e.target.checkValidity() && inputDescription.current.checkValidity()
      ? setResetSubmitButton(false)
      : setResetSubmitButton(true);
    setNameError(e.target.validationMessage);
  }
  function changeDescriptionInput(e) {
    setDescription(e.target.value);
    e.target.checkValidity() && inputName.current.checkValidity()
      ? setResetSubmitButton(false)
      : setResetSubmitButton(true);
    setDescriptionError(e.target.validationMessage);
  }
  useEffect(() => {
    if (isOpen) {
      inputName.current.checkValidity() && inputDescription.current.checkValidity()
        ? setResetSubmitButton(false)
        : setResetSubmitButton(true);
    } else {
      setResetSubmitButton(false);
    }
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
        value={name}
        onChange={changeNameInput}
        ref={inputName}
      />
      <span className={errorClassName}>{nameError}</span>
      <input
        placeholder="О себе"
        type="text"
        className="popup__input"
        minLength={2}
        maxLength={200}
        required
        value={description}
        onChange={changeDescriptionInput}
        ref={inputDescription}
      />
      <span className={errorClassName}>{descriptionError}</span>
    </PopupWithForm>
  );
}
