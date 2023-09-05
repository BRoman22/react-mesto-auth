const BASE_URL = 'https://auth.nomoreparties.co';
const checkResponse = (res) => (res.ok ? res.json() : Promise.reject());
const localToken = localStorage.getItem('token');

export const register = (data) =>
  fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);

export const login = (data) =>
  fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);

export const checkToken = () =>
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localToken}`,
    },
  }).then(checkResponse);
