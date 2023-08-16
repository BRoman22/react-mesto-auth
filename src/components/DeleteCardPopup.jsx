import PopupWithForm from './PopupWithForm';

export default function DeleteCardPopup({ isOpen, onClose, onDeleteCard, buttonText }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }
  return (
    <PopupWithForm
      name={'confirmation'}
      title={'Вы уверены?'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
