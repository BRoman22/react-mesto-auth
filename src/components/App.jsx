import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import { api } from '../utils/Api';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = useState(null);
  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(api.catch);
    api.getCardList().then(setCards).catch(api.catch);
  }, []);
  const [buttonText, setButtonText] = useState({
    user: 'Сохранить',
    card: 'Создать',
    confirmation: 'Да',
  });
  function handleUpdateUser(data) {
    setButtonText({ ...buttonText, user: 'Сохранение...' });
    setTimeout(() => {
      api
        .setUserInfo(data)
        .then((res) => setCurrentUser({ ...currentUser, name: res.name, about: res.about }))
        .catch(api.catch)
        .finally(setButtonText({ ...buttonText, user: 'Сохранить' }));
      closeAllPopups();
    }, 300);
  }
  function handleUpdateAvatar(data) {
    setButtonText({ ...buttonText, user: 'Сохранение...' });
    setTimeout(() => {
      api
        .setAvatar(data)
        .then((res) => setCurrentUser({ ...currentUser, avatar: res.avatar }))
        .catch(api.catch)
        .finally(setButtonText({ ...buttonText, user: 'Сохранить' }));
      closeAllPopups();
    }, 300);
  }
  function handleAddCard(data) {
    setButtonText({ ...buttonText, card: 'Сохранение...' });
    setTimeout(() => {
      api
        .addNewCard(data)
        .then((newCard) => setCards([newCard, ...cards]))
        .catch(api.catch)
        .finally(setButtonText({ ...buttonText, card: 'Создать' }));
      closeAllPopups();
    }, 300);
  }
  function handleCardDelete() {
    setButtonText({ ...buttonText, confirmation: 'Удаление...' });
    setTimeout(() => {
      api
        .deleteCard(cardId)
        .then(setCards((cards) => cards.filter((card) => card._id != cardId)))
        .catch(api.catch)
        .finally(setButtonText({ ...buttonText, card: 'Да' }));
      closeAllPopups();
    }, 300);
  }

  const [popup, setPopup] = useState({
    profile: false,
    card: false,
    avatar: false,
    confirmation: false,
    image: false,
  });
  function handleEditProfileClick() {
    setPopup({ ...popup, profile: true });
  }
  function handleEditAvatarClick() {
    setPopup({ ...popup, avatar: true });
  }
  function handleAddPlaceClick() {
    setPopup({ ...popup, card: true });
  }
  const [cardId, setCardId] = useState(null);
  function handleConfirmDeleteCardClick(id) {
    setPopup({ ...popup, confirmation: true });
    setCardId(id);
  }
  const [imageLink, setImageLink] = useState(null);
  function handleCardClick(name, link) {
    setPopup({ ...popup, image: true });
    setImageLink({ name: name, link: link });
  }

  function closeAllPopups() {
    setPopup({
      profile: false,
      card: false,
      avatar: false,
      confirmation: false,
      image: false,
    });
  }
  const isOpen = popup.profile || popup.card || popup.avatar || popup.confirmation || popup.image;
  useEffect(() => {
    function escClose(e) {
      e.key === 'Escape' ? closeAllPopups() : null;
    }
    isOpen ? document.addEventListener('keydown', escClose) : null;
    return () => document.removeEventListener('keydown', escClose);
  }, [isOpen]);

  function handleToggleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c))))
      .catch(api.catch);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={cards}>
        <div className="page">
          <div className="page__content">
            <Header />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleToggleCardLike}
              onCardDelete={handleConfirmDeleteCardClick}
              cards={cards}
            />
            <Footer />
            <EditProfilePopup
              isOpen={popup.profile}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              buttonText={buttonText.user}
            />
            <AddPlacePopup
              isOpen={popup.card}
              onClose={closeAllPopups}
              onAddPlace={handleAddCard}
              buttonText={buttonText.card}
            />
            <EditAvatarPopup
              isOpen={popup.avatar}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              buttonText={buttonText.user}
            />
            <DeleteCardPopup
              isOpen={popup.confirmation}
              onClose={closeAllPopups}
              onDeleteCard={handleCardDelete}
              buttonText={buttonText.confirmation}
            />
            <ImagePopup isOpen={popup.image} onClose={closeAllPopups} imageData={imageLink} />
          </div>
        </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}
