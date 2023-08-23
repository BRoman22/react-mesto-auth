import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <img src={currentUser?.avatar} alt={currentUser?.name} className="profile__avatar" />
        <button
          aria-label="редактировать"
          type="button"
          className="profile__button-edit-avatar"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="редактировать"
            type="button"
            className="profile__button-edit"
            onClick={onEditProfile}
          />
          <p className="profile__subtitle">{currentUser?.about}</p>
        </div>
        <button
          aria-label="добавить карточку"
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        />
      </section>
      <section aria-label="карточки" className="cards">
        <div className="cards__list">
          {cards?.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
