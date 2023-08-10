import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

export default function App() {
  //Состояние попапов
  const [popup, setPopup] = useState({
    profile: false,
    card: false,
    avatar: false,
    confirmation: false,
    image: false,
  });
  //открываем попапы
  function handleEditProfileClick() {
    setPopup({ ...popup, profile: true });
  }
  function handleEditAvatarClick() {
    setPopup({ ...popup, avatar: true });
  }
  function handleAddPlaceClick() {
    setPopup({ ...popup, card: true });
  }
  //закрываем попапы
  function closeAllPopups() {
    setPopup({
      profile: false,
      card: false,
      avatar: false,
      confirmation: false,
      image: false,
    });
  }
  //закрываем попапы по нажатию Esc
  const isOpen = popup.profile || popup.card || popup.avatar || popup.confirmation || popup.image;
  useEffect(() => {
    function escClose(e) {
      e.key === 'Escape' ? closeAllPopups() : null;
    }
    isOpen ? document.addEventListener('keydown', escClose) : null;
    return () => document.removeEventListener('keydown', escClose);
  }, [isOpen]);

  const [imagePopup, setImagePopup] = useState(null);
  //открываем и передаем данные карточки в попап с картинкой
  function handleCardClick(name, link) {
    setPopup({ ...popup, image: true });
    setImagePopup({ ...imagePopup, name: name, link: link });
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name={'profile'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          isOpen={popup.profile}
          onClose={closeAllPopups}
        >
          <input
            placeholder="Введите имя"
            name="name"
            type="text"
            className="popup__input popup__input_name"
            id="profile-name-input"
          />
          <span className="popup__error profile-name-input-error" />
          <input
            placeholder="О себе"
            name="about"
            type="text"
            className="popup__input popup__input_about"
            id="about-input"
          />
          <span className="popup__error about-input-error" />
        </PopupWithForm>

        <PopupWithForm
          name={'card'}
          title={'Новое место'}
          buttonText={'Создать'}
          isOpen={popup.card}
          onClose={closeAllPopups}
        >
          <input
            placeholder="Название"
            name="name"
            type="text"
            className="popup__input popup__input_name"
            id="card-name-input"
          />
          <span className="popup__error card-name-input-error" />
          <input
            placeholder="Ссылка на картинку"
            name="link"
            type="url"
            className="popup__input popup__input_link"
            id="link-input"
          />
          <span className="popup__error link-input-error" />
        </PopupWithForm>

        <PopupWithForm
          name={'avatar'}
          title={'Обновить аватар'}
          buttonText={'Сохранить'}
          isOpen={popup.avatar}
          onClose={closeAllPopups}
        >
          <input
            placeholder="Ссылка на картинку"
            name="avatar"
            type="url"
            className="popup__input popup__input_link"
            id="avatar-input"
          />
          <span className="popup__error avatar-input-error" />
        </PopupWithForm>

        <PopupWithForm
          name={'confirmation'}
          title={'Вы уверены?'}
          buttonText={'Да'}
          isOpen={popup.confirmation}
          onClose={closeAllPopups}
        />

        <ImagePopup isOpen={popup.image} onClose={closeAllPopups} imageData={imagePopup} />
      </div>
    </div>
  );
}
