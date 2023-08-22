export function useApi(url, token) {
  const request = (path, method, data) => {
    return fetch(`${url}/${path}`, {
      method: method,
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    }).then(checkResponse);
  };

  const getUserInfo = () => {
    return request('users/me');
  };

  const setUserInfo = (data) => {
    return request('users/me', 'PATCH', data);
  };

  const setAvatar = (data) => {
    return request('users/me/avatar', 'PATCH', data);
  };

  const getCardList = () => {
    return request('cards');
  };

  const toggleLike = (card, isLiked) => {
    return request(`cards/${card}/likes`, isLiked ? 'DELETE' : 'PUT');
  };

  const addNewCard = (data) => {
    return request('cards', 'POST', data);
  };

  const deleteCard = (id) => {
    return request(`cards/${id}`, 'DELETE');
  };

  const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };
  const getError = (err) => {
    alert(err);
  };

  return {
    getUserInfo,
    setUserInfo,
    setAvatar,
    getCardList,
    toggleLike,
    addNewCard,
    deleteCard,
    getError,
  };
}
