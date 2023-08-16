import { useRef, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const inputValue = useRef();
  const [linkError, setLinkError] = useState();
  const [resetSubmitButton, setResetSubmitButton] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: inputValue.current.value });
    inputValue.current.value = '';
  }
  function closePopup() {
    onClose();
    inputValue.current.value = '';
    setLinkError('');
  }
  //валидация
  function changeLinkInput(e) {
    e.target.checkValidity() ? setResetSubmitButton(false) : setResetSubmitButton(true);
    setLinkError(e.target.validationMessage);
  }
  useEffect(() => {
    if (isOpen) {
      inputValue.current.checkValidity() ? setResetSubmitButton(false) : setResetSubmitButton(true);
    } else {
      setResetSubmitButton(false);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={closePopup}
      onSubmit={handleSubmit}
      isDisable={resetSubmitButton}
    >
      <input
        placeholder="Ссылка на картинку"
        type="url"
        className="popup__input"
        required
        onChange={changeLinkInput}
        ref={inputValue}
      />
      <span className={`popup__error ${resetSubmitButton && 'popup__error_active'}`}>
        {linkError}
      </span>
    </PopupWithForm>
  );
}
