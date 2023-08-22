import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidation from '../hooks/useFormValidation';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const { inputs, setInputs, errors, isValid, handleChange, resetAllForm } = useFormValidation();
  const currentUser = useContext(CurrentUserContext);
  const errorClassName = `popup__error ${(errors.name || errors.about) && 'popup__error_active'}`;

  useEffect(() => {
    resetAllForm();
    setInputs({ ...inputs, name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: inputs.name, about: inputs.about });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        placeholder="Введите имя"
        type="text"
        className="popup__input"
        minLength={2}
        maxLength={40}
        required
        value={inputs.name}
        onChange={(e) => handleChange('name', e)}
      />
      <span className={errorClassName}>{errors.name}</span>
      <input
        placeholder="О себе"
        type="text"
        className="popup__input"
        minLength={2}
        maxLength={200}
        required
        value={inputs.about}
        onChange={(e) => handleChange('about', e)}
      />
      <span className={errorClassName}>{errors.about}</span>
    </PopupWithForm>
  );
}
