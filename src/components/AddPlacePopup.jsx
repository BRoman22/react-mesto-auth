import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const { inputs, errors, isValid, handleChange, resetAllForm, resetSubmitButton } =
    useFormValidation();
  const errorClassName = `popup__error ${(errors.place || errors.link) && 'popup__error_active'}`;

  useEffect(() => {
    resetAllForm();
    resetSubmitButton();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: inputs.place, link: inputs.link });
  }

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        placeholder="Название"
        type="text"
        className="popup__input"
        minLength={2}
        maxLength={30}
        required
        value={inputs.place}
        onChange={(e) => handleChange('place', e)}
      />
      <span className={errorClassName}>{errors.place}</span>
      <input
        placeholder="Ссылка на картинку"
        type="url"
        className="popup__input"
        required
        value={inputs.link}
        onChange={(e) => handleChange('link', e)}
      />
      <span className={errorClassName}>{errors.link}</span>
    </PopupWithForm>
  );
}
