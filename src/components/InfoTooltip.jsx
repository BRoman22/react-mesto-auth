import unionSuccess from '../images/unionSuccess.svg';
import unionFail from '../images/unionFail.svg';
import usePopupClose from '../hooks/usePopupClose';

export default function InfoTooltip({ name, title, isOpen, onClose }) {
  const popupClassName = `popup ${isOpen && 'popup_opened'}`;
  usePopupClose(isOpen, onClose);
  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <img src={name === 'success' ? unionSuccess : unionFail} className="popup__logo" />
        <h2 className="popup__title popup__title_tooltip">{title}</h2>
        <button aria-label="закрыть" type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
