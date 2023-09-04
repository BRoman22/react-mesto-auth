import close from '../images/close.svg';

export default function Burger({ isOpen, handleClick }) {
  return (
    <>
      {isOpen ? (
        <button className="burger" onClick={handleClick}>
          <div className="burger__element" />
          <div className="burger__element" />
          <div className="burger__element" />
        </button>
      ) : (
        <button src={close} className="burger__close" aria-label="закрыть" onClick={handleClick} />
      )}
    </>
  );
}
