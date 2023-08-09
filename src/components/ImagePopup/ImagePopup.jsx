export default function ImagePopup({ isOpen, onClose, name, link }) {
  return (
    <div
      className={isOpen ? 'popup popup_picture popup_opened' : 'popup popup_picture'}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_picture"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={link} alt={name} className="popup__image" />
        <h2 className="popup__title popup__title_picture">{name}</h2>
        <button aria-label="закрыть" type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
