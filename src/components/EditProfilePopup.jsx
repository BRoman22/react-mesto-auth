import { useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';

const modalRoot = document.querySelector('#modals');

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({ mode: 'onChange', defaultValues: { name: '', about: '' } });

  useEffect(() => {
    reset();
    setValue('name', currentUser?.name);
    setValue('about', currentUser?.about);
  }, [isOpen, currentUser]);

  function onSubmit({ name, about }) {
    onUpdateUser({ name, about });
  }

  return createPortal(
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <input
        placeholder="Введите имя"
        className="popup__input"
        maxLength={40}
        {...register('name', {
          required: 'Заполните это поле.',
          minLength: { value: 2, message: 'Текст должен быть не короче 2 симв.' },
        })}
      />
      <span className="popup__error">{errors.name?.message}</span>
      <input
        placeholder="О себе"
        className="popup__input"
        maxLength={200}
        {...register('about', {
          required: 'Заполните это поле.',
          minLength: { value: 2, message: 'Текст должен быть не короче 2 симв.' },
        })}
      />
      <span className="popup__error">{errors.about?.message}</span>
    </PopupWithForm>,
    modalRoot
  );
}
