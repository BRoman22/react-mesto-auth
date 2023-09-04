import { createPortal } from 'react-dom';
import PopupWithForm from './PopupWithForm';

const modalRoot = document.querySelector('#modals');

export default function DeleteCardPopup({ isOpen, onClose, onDeleteCard, buttonText }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return createPortal(
    <PopupWithForm
      name={'confirmation'}
      title={'Вы уверены?'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    />,
    modalRoot
  );
}
