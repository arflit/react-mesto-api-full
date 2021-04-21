class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _header(customHeaders) {
    if (customHeaders) {return customHeaders} else {return this._headers}
  }

  _apiRequest(urlEnd, method, body, customHeaders) {
    if (method === 'GET') {
      return fetch(`${this._baseUrl}${urlEnd}`, {
        method: method,
        credentials: 'include',
        headers: this._header(customHeaders),
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    } else {
      return fetch(`${this._baseUrl}${urlEnd}`, {
        method: method,
        credentials: 'include',
        headers: this._header(customHeaders),
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  }

  signUp(data) {
    return this._apiRequest('/signup', 'POST', {
      password: data.password,
      email: data.email
    })
  }

  signIn(data) {
    return this._apiRequest('/signin', 'POST', {
      password: data.password,
      email: data.email
    })
  }

  checkToken() {
    return this._apiRequest('/users/me', 'GET', null, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  getUserInfo() {
    return this._apiRequest('/users/me', 'GET')
  }

  updateUserInfo(userInfo) {
    return this._apiRequest('/users/me', 'PATCH', {
      name: userInfo.name,
      about: userInfo.about,
    })
  }

  setNewAvatar(avatarUrl) {
    return this._apiRequest('/users/me/avatar', 'PATCH', {
      avatar: avatarUrl,
    })
  }

  getInitialCards() {
    return this._apiRequest('/cards', 'GET')
  }

  addNewCard(card) {
    return this._apiRequest('/cards', 'POST', {
      name: card.name,
      link: card.link,
    })
  }

  addCardLike(id) {
    return this._apiRequest(`/cards/likes/${id}`, 'PUT')
  }

  removeCardLike(id) {
    return this._apiRequest(`/cards/likes/${id}`, 'DELETE')
  }

  removeCard(id) {
    return this._apiRequest(`/cards/${id}`, 'DELETE')
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '0ea9232f-20d8-4231-b26e-2828aaef49f5',
    'Content-Type': 'application/json',
  },
})

export const authApi = new Api({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  },
})
