import usePopupClose from '../hooks/usePopupClose';

export default function ImagePopup({ isOpen, onClose, card }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_picture ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div
        className="popup__container popup__container_picture"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={card?.link} alt={card?.name} className="popup__image" />
        <h2 className="popup__title popup__title_picture">{card?.name}</h2>
        <button aria-label="закрыть" type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
