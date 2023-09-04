import { createPortal } from 'react-dom';
import unionSuccess from '../images/unionSuccess.svg';
import unionFail from '../images/unionFail.svg';
import usePopupClose from '../hooks/usePopupClose';

const modalRoot = document.querySelector('#modals');

export default function InfoTooltip({ success, fail, onClose }) {
  const isOpen = success || fail;

  const popupClassName = `popup popup__infoTooltip ${isOpen && 'popup_opened'}`;
  usePopupClose(isOpen, onClose);

  return createPortal(
    <div className={popupClassName}>
      <div className="popup__container popup__container_fix">
        <img src={success ? unionSuccess : unionFail} className="popup__logo" />
        <h2 className="popup__title popup__title_tooltip">
          {success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}
        </h2>
        <button aria-label="закрыть" type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>,
    modalRoot
  );
}
