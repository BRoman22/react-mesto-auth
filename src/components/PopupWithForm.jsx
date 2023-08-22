import usePopupClose from '../hooks/usePopupClose';

export default function FPopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  children,
}) {
  const popupClassName = `popup popup_${name} ${isOpen && 'popup_opened'}`;
  const submitButtonClassName = `popup__button ${!isValid && 'popup__button_disabled'}`;
  usePopupClose(isOpen, onClose);
  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <form name={name} className={`popup__form popup__form_${name}`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className={submitButtonClassName} disabled={!isValid}>
            {buttonText}
          </button>
        </form>
        <button aria-label="закрыть" type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
