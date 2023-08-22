import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const { inputs, errors, isValid, handleChange, resetAllForm, resetSubmitButton } =
    useFormValidation();
  const errorClassName = `popup__error ${errors.avatar && 'popup__error_active'}`;

  useEffect(() => {
    resetAllForm();
    resetSubmitButton();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: inputs.avatar });
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        placeholder="Ссылка на картинку"
        type="url"
        className="popup__input"
        required
        value={inputs.avatar}
        onChange={(e) => handleChange('avatar', e)}
      />
      <span className={errorClassName}>{errors.avatar}</span>
    </PopupWithForm>
  );
}
