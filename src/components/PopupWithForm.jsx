export default function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isDisable,
  children,
}) {
  const popupClassName = `popup popup_${name} ${isOpen && 'popup_opened'}`;
  const submitButtonClassName = `popup__button ${isDisable && 'popup__button_disabled'}`;
  return (
    <div className={popupClassName} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <form name={name} className={`popup__form popup__form_${name}`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className={submitButtonClassName} disabled={isDisable}>
            {buttonText}
          </button>
        </form>
        <button aria-label="закрыть" type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
