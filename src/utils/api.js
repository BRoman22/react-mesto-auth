import myToken from './myToken';

const token = myToken;
const url = 'https://nomoreparties.co/v1/cohort-71';
const checkResponse = (res) => (res.ok ? res.json() : Promise.reject());

const request = (path, method, data) =>
  fetch(`${url}/${path}`, {
    method: method,
    headers: { authorization: token, 'Content-Type': 'application/json' },
    body: data && JSON.stringify(data),
  }).then(checkResponse);

export const getUserInfo = () => request('users/me');

export const setUserInfo = (data) => request('users/me', 'PATCH', data);

export const setAvatar = (data) => request('users/me/avatar', 'PATCH', data);

export const getCardList = () => request('cards');

export const toggleLike = (card, isLiked) =>
  request(`cards/${card}/likes`, isLiked ? 'DELETE' : 'PUT');

export const addNewCard = (data) => request('cards', 'POST', data);

export const deleteCard = (id) => request(`cards/${id}`, 'DELETE');

export const getError = (err) => alert(err);
