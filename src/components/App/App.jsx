import React, { useState, useEffect } from 'react';
import '../../index.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';

export default function App() {
  //Состояние попапов
  const [popup, setPopup] = useState({
    profile: false,
    card: false,
    avatar: false,
    confirmation: false,
    image: false,
  });
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
  useEffect(() => {
    function escClose(e) {
      e.key === 'Escape' ? closeAllPopups() : null;
    }
    document.addEventListener('keydown', escClose);

    return () => {
      document.removeEventListener('keydown', escClose);
    };
  }, []);
  //состояние попапа с картинкой
  const [image, setImage] = useState(null);
  //передаем данные карточки в попап с картинкой
  function handleCardClick(name, link) {
    setPopup({ ...popup, image: true });
    setImage({ ...image, name: name, link: link });
  }

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onEditProfile={() => setPopup({ ...popup, profile: true })}
            onAddPlace={() => setPopup({ ...popup, card: true })}
            onEditAvatar={() => setPopup({ ...popup, avatar: true })}
            onCardClick={handleCardClick}
          />
          <Footer />

          <PopupWithForm
            name={'profile'}
            title={'Редактировать профиль'}
            isOpen={popup.profile}
            onClose={closeAllPopups}
          >
            <input
              placeholder="Введите имя"
              name="name"
              type="text"
              className="popup__input popup__input_name"
              id="profile-name-input"
              required
            />
            <span className="popup__error profile-name-input-error"></span>
            <input
              placeholder="О себе"
              name="about"
              type="text"
              className="popup__input popup__input_about"
              id="about-input"
              required
            />
            <span className="popup__error about-input-error"></span>
            <button type="submit" className="popup__button">
              Сохранить
            </button>
          </PopupWithForm>

          <PopupWithForm
            name={'card'}
            title={'Новое место'}
            isOpen={popup.card}
            onClose={closeAllPopups}
          >
            <input
              placeholder="Название"
              name="name"
              type="text"
              className="popup__input popup__input_name"
              id="card-name-input"
              required
            />
            <span className="popup__error card-name-input-error"></span>
            <input
              placeholder="Ссылка на картинку"
              name="link"
              type="url"
              className="popup__input popup__input_link"
              id="link-input"
              required
            />
            <span className="popup__error link-input-error"></span>
            <button type="submit" className="popup__button">
              Создать
            </button>
          </PopupWithForm>

          <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            isOpen={popup.avatar}
            onClose={closeAllPopups}
          >
            <input
              placeholder="Ссылка на картинку"
              name="avatar"
              type="url"
              className="popup__input popup__input_link"
              id="avatar-input"
              required
            />
            <span className="popup__error avatar-input-error"></span>
            <button type="submit" className="popup__button popup__button_avatar">
              Сохранить
            </button>
          </PopupWithForm>

          <PopupWithForm
            name={'confirmation'}
            title={'Вы уверены?'}
            isOpen={popup.confirmation}
            onClose={closeAllPopups}
          >
            <button type="submit" className="popup__button popup__button_confirmation">
              Да
            </button>
          </PopupWithForm>

          <ImagePopup isOpen={popup.image} onClose={closeAllPopups} {...image} />
        </div>
      </div>
    </>
  );
}
