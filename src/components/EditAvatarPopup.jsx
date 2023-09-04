import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import PopupWithForm from './PopupWithForm';

const modalRoot = document.querySelector('#modals');

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'onChange', defaultValues: { avatar: '' } });

  useEffect(() => {
    reset();
  }, [isOpen]);

  function onSubmit(data) {
    onUpdateAvatar({ avatar: data.avatar });
  }

  return createPortal(
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <input
        placeholder="Ссылка на картинку"
        className="popup__input"
        {...register('avatar', {
          required: 'Заполните это поле.',
          pattern: {
            value:
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            message: 'Введите URL.',
          },
        })}
      />
      <span className="popup__error">{errors.avatar?.message}</span>
    </PopupWithForm>,
    modalRoot
  );
}
