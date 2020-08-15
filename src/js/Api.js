export default class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  getInitialCards = () => {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res =>
        this._getResponseData(res));
  }

  addCardPage = (name, link) => {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name.value,
        link: link.value
      })
    })
      .then(res =>
        this._getResponseData(res));
  }

  getUsersInfo = () => {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res =>
        this._getResponseData(res));
  }

  updateUserInfo = (name, about) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res =>
        this._getResponseData(res));
  }

  removeCard = id => {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res =>
        this._getResponseData(res));
  }

  setLikeCard = id => {
    return fetch(`${this.baseUrl}/cards/like/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(res =>
        this._getResponseData(res));
  }

  unLikeCard = id => {
    return fetch(`${this.baseUrl}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res =>
        this._getResponseData(res));
  }

  addNewAvatar = link => {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link.value
      })
    })
      .then(res =>
        this._getResponseData(res));
  }

  _getResponseData = res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}
