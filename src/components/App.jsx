import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as api from '../utils/api';
import * as auth from '../utils/auth';

export default function App() {
  //auth
  const localLoggedIn = JSON.parse(localStorage.getItem('isLogged'));
  const [loggedIn, setLoggedIn] = useState(localLoggedIn);
  const [email, setEmail] = useState(null);

  function toggleLoggedIn() {
    setLoggedIn((prev) => {
      localStorage.setItem('isLogged', JSON.stringify(!prev));
      return !prev;
    });
  }

  function getContent() {
    api.getUserInfo().then(setCurrentUser).catch(api.getError);
    api.getCardList().then(setCards).catch(api.getError);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      auth
        .checkToken()
        .then((res) => {
          setEmail(res.data.email);
          getContent();
        })
        .catch(toggleLoggedIn);
    }
  }, []);

  function handleRegister(email, password) {
    auth
      .register({ email, password })
      .then(() => setPopup({ ...popup, infoTooltipSuccess: true }))
      .catch(() => setPopup({ ...popup, infoTooltipFail: true }));
  }

  function handleLogin(email, password) {
    auth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.token);
        setEmail(email);
        getContent();
        toggleLoggedIn();
      })
      .catch(() => setPopup({ ...popup, infoTooltipFail: true }));
  }

  function handleSignout() {
    setEmail('');
    localStorage.removeItem('token');
    toggleLoggedIn();
  }

  //submits
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState(null);

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
      .then(closeAllPopups())
      .catch(api.getError)
      .finally(() => setIsLoading(false, buttonName));
  }

  function handleUpdateUser(data) {
    function makeRequest() {
      return api.setUserInfo(data).then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about });
      });
    }
    handleSubmit(makeRequest, 'user');
  }

  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.setAvatar(data).then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
      });
    }
    handleSubmit(makeRequest, 'user');
  }

  function handleAddCard(data) {
    function makeRequest() {
      return api.addNewCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }
    handleSubmit(makeRequest, 'card');
  }

  function handleCardDelete() {
    function makeRequest() {
      return api.deleteCard(cardId).then(() => {
        setCards((cards) => cards.filter((card) => card._id != cardId));
      });
    }
    handleSubmit(makeRequest, 'confirmation');
  }

  function handleToggleCardLike(card, isLiked) {
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c))))
      .catch(api.getError);
  }

  //открытие/закрытие попапов
  const [popup, setPopup] = useState({
    profile: false,
    card: false,
    avatar: false,
    confirmation: false,
    image: false,
    infoTooltipSuccess: false,
    infoTooltipFail: false,
  });
  function handleEditProfileClick() {
    setPopup({ ...popup, profile: true });
  }
  function handleAddPlaceClick() {
    setPopup({ ...popup, card: true });
  }
  function handleEditAvatarClick() {
    setPopup({ ...popup, avatar: true });
  }
  const [cardId, setCardId] = useState(null);
  function handleConfirmDeleteCardClick(id) {
    setPopup({ ...popup, confirmation: true });
    setCardId(id);
  }
  const [cardData, setCardData] = useState(null);
  function handleCardClick(name, link) {
    setPopup({ ...popup, image: true });
    setCardData({ name: name, link: link });
  }

  function closeAllPopups() {
    setPopup({
      profile: false,
      card: false,
      avatar: false,
      confirmation: false,
      image: false,
      infoTooltipSuccess: false,
      infoTooltipFail: false,
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={cards}>
        <div className="page">
          <div className="page__content">
            <Header email={email} signout={handleSignout} />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
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
                  </ProtectedRoute>
                }
              />
              {!loggedIn && (
                <Route path="/signup" element={<Register onRegister={handleRegister} />} />
              )}
              {!loggedIn && <Route path="/signin" element={<Login onLogin={handleLogin} />} />}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
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
            <InfoTooltip
              success={popup.infoTooltipSuccess}
              fail={popup.infoTooltipFail}
              onClose={closeAllPopups}
            />
          </div>
        </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}
