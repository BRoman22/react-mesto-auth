import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    reset();
  }, [isOpen]);

  function onSubmit(data) {
    onAddPlace({ name: data.name, link: data.link });
  }

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <input
        placeholder="Название"
        className="popup__input"
        maxLength={30}
        {...register('name', {
          required: 'Заполните это поле.',
          minLength: { value: 2, message: 'Текст должен быть не короче 2 симв.' },
        })}
      />
      <span className="popup__error">{errors.name?.message}</span>
      <input
        placeholder="Ссылка на картинку"
        className="popup__input"
        {...register('link', {
          required: 'Заполните это поле.',
          pattern: {
            value:
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            message: 'Введите URL.',
          },
        })}
      />
      <span className="popup__error">{errors.link?.message}</span>
    </PopupWithForm>
  );
}
