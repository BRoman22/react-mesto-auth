import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`;

  function handleClick() {
    onCardClick(card.name, card.link);
  }
  function handleToggleLike() {
    onCardLike(card, isLiked);
  }
  function handleDeleteCard() {
    onCardDelete(card._id);
  }

  return (
    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <div className="card__wrapper">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__wrap">
          <button
            aria-label="нравится"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleToggleLike}
          />
          <span className="card__counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          aria-label="удалить"
          type="button"
          className="card__delete"
          onClick={handleDeleteCard}
        />
      )}
    </article>
  );
}
