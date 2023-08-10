import { myToken } from './myToken';
class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  _request(path) {
    return `${this._url}/v1/cohort-71/${path}`;
  }

  _options(method = 'GET', data) {
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
    return fetch(this._request('users/me'), this._options()).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._request('cards'), this._options()).then(this._checkResponse);
  }

  setLike(cardData) {
    return fetch(
      this._request(`cards/${cardData._id}/likes`),
      this._options({ method: 'PUT' })
    ).then(this._checkResponse);
  }

  setDislike(cardData) {
    return fetch(
      this._request(`cards/${cardData._id}/likes`),
      this._options({ method: 'DELETE' })
    ).then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(this._request('users/me'), this._options({ method: 'PATCH', data })).then(
      this._checkResponse
    );
  }

  setNewCard(data) {
    return fetch(this._request('cards'), this._options({ method: 'POST', data })).then(
      this._checkResponse
    );
  }

  deleteCard(id) {
    return fetch(this._request(`cards/${id}`), this._options({ method: 'DELETE' })).then(
      this._checkResponse
    );
  }

  setAvatar(data) {
    return fetch(this._request('users/me/avatar'), this._options({ method: 'PATCH', data })).then(
      this._checkResponse
    );
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

export const api = new Api('https://nomoreparties.co', myToken);
