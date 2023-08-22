import React, { useState, useEffect, useCallback } from 'react';
import '../index.css';
import Header from './Header';
import { Main } from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import { useApi } from '../hooks/useApi';
import { myToken } from '../utils/myToken';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = useState(null);
  const {
    getUserInfo,
    setUserInfo,
    setAvatar,
    getCardList,
    toggleLike,
    addNewCard,
    deleteCard,
    getError,
  } = useApi('https://nomoreparties.co/v1/cohort-71', myToken);

  useEffect(() => {
    getUserInfo().then(setCurrentUser).catch(getError);
    getCardList().then(setCards).catch(getError);
  }, []);

  //submits
  const [buttonText, setButtonText] = useState({
    user: 'Сохранить',
    card: 'Создать',
    confirmation: 'Да',
  });
  const setIsLoading = (isLoading, buttonName) => {
    const text = buttonName != 'confirmation' ? 'Сохранение...' : 'Удаление...';
    const initialText = buttonText[buttonName];
    isLoading
      ? setButtonText({ ...buttonText, [buttonName]: text })
      : setButtonText({ ...buttonText, [buttonName]: initialText });
  };
  function handleSubmit(makeRequest, buttonName) {
    setIsLoading(true, buttonName);
    makeRequest()
      .catch(getError)
      .finally(() => setIsLoading(false, buttonName));
  }
  function handleUpdateUser(data) {
    function makeRequest() {
      return setUserInfo(data).then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about });
        closeAllPopups();
      });
    }
    handleSubmit(makeRequest, 'user');
  }
  function handleUpdateAvatar(data) {
    function makeRequest() {
      return setAvatar(data).then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
        closeAllPopups();
      });
    }
    handleSubmit(makeRequest, 'user');
  }
  function handleAddCard(data) {
    function makeRequest() {
      return addNewCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      });
    }
    handleSubmit(makeRequest, 'card');
  }
  function handleCardDelete() {
    function makeRequest() {
      return deleteCard(cardId).then(() => {
        setCards((cards) => cards.filter((card) => card._id != cardId));
        closeAllPopups();
      });
    }
    handleSubmit(makeRequest, 'confirmation');
  }

  const handleToggleCardLike = useCallback((card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    toggleLike(card._id, isLiked)
      .then((newCard) => setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c))))
      .catch(getError);
  }, []);
  //открытие/закрытие попапов
  const [popup, setPopup] = useState({
    profile: false,
    card: false,
    avatar: false,
    confirmation: false,
    image: false,
  });
  const handleEditProfileClick = useCallback(() => {
    setPopup({ ...popup, profile: true });
  }, []);
  const handleAddPlaceClick = useCallback(() => {
    setPopup({ ...popup, card: true });
  }, []);
  const handleEditAvatarClick = useCallback(() => {
    setPopup({ ...popup, avatar: true });
  }, []);
  const [cardId, setCardId] = useState(null);
  const handleConfirmDeleteCardClick = useCallback((id) => {
    setPopup({ ...popup, confirmation: true });
    setCardId(id);
  }, []);
  const [cardData, setCardData] = useState(null);
  const handleCardClick = useCallback((name, link) => {
    setPopup({ ...popup, image: true });
    setCardData({ name: name, link: link });
  }, []);

  function closeAllPopups() {
    setPopup({
      profile: false,
      card: false,
      avatar: false,
      confirmation: false,
      image: false,
    });
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
            <ImagePopup isOpen={popup.image} onClose={closeAllPopups} card={cardData} />
          </div>
        </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}
