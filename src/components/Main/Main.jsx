import { useEffect, useState } from 'react';
import { api } from '../../utils/Api';
import Card from '../Card/Card';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, gg }) {
  const [userName, setUserName] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    api
      .request({ path: '/users/me' })
      .then(({ name, about, avatar }) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
      .catch(api.catch);
    api.request({ path: '/cards' }).then(setCards).catch(api.catch);
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <img src={userAvatar} alt={userName} className="profile__avatar" />
        <button
          aria-label="редактировать"
          type="button"
          className="profile__button-edit-avatar"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            aria-label="редактировать"
            type="button"
            className="profile__button-edit"
            onClick={onEditProfile}
          />
          <p className="profile__subtitle">{userDescription}</p>
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
          {cards?.map((data) => (
            <Card key={data._id} {...data} onCardClick={onCardClick} gg={gg} />
          ))}
        </div>
      </section>
    </main>
  );
}
