import { myToken } from './myToken';
class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }
  _options(method, data) {
    return {
      method: method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    };
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, this._options()).then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, this._options('PATCH', data)).then(this._checkResponse);
  }

  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, this._options('PATCH', data)).then(
      this._checkResponse
    );
  }

  getCardList() {
    return fetch(`${this._url}/cards`, this._options()).then(this._checkResponse);
  }

  toggleLike(card, isLiked) {
    return fetch(
      `${this._url}/cards/${card}/likes`,
      this._options(isLiked ? 'DELETE' : 'PUT')
    ).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, this._options('POST', data)).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, this._options('DELETE')).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  catch(err) {
    alert(err);
  }
}

export const api = new Api('https://nomoreparties.co/v1/cohort-71', myToken);
