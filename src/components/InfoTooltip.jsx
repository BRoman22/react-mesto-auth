import unionSuccess from '../images/unionSuccess.svg';
import unionFail from '../images/unionFail.svg';
import usePopupClose from '../hooks/usePopupClose';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modals');

export default function InfoTooltip({ name, title, isOpen, onClose }) {
  const popupClassName = `popup ${isOpen && 'popup_opened'}`;
  usePopupClose(isOpen, onClose);

  return createPortal(
    <div className={popupClassName}>
      <div className="popup__container popup__container_fix">
        <img src={name === 'success' ? unionSuccess : unionFail} className="popup__logo" />
        <h2 className="popup__title popup__title_tooltip">{title}</h2>
        <button aria-label="закрыть" type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>,
    modalRoot
  );
}
