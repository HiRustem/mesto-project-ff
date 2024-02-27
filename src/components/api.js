const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-8',
    headers: {
      authorization: '3ae51cda-3b20-4113-bf7b-6a034b0faaef',
      'Content-Type': 'application/json'
    }
}

export const getUserInfo = async () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(result => {
        if (result.ok) {
            return result.json()
        }

        return Promise.reject(`Ошибка ${result.status}`)
    })
}
  
export const getInitialCards = async () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(result => {
        if (result.ok) {
            return result.json()
        }

        return Promise.reject(`Ошибка ${result.status}`)
    })
}

export const saveUserInfo = async (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        })
    })
    .then(result => {
        if (!result.ok) {
            return Promise.reject(`Ошибка ${result.status}`)
        }
    })
}

export const saveNewCard = async (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        })
    })
    .then(result => {
        if (result.ok) {
            return result.json()
        }

        return Promise.reject(`Ошибка ${result.status}`)
    })
}

export const deleteCard = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(result => {
        if (!result.ok) {
            return Promise.reject(`Ошибка ${result.status}`)
        }
    })
}

export const putLike = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(result => {
        if (result.ok) {
            return result.json()
        }

        return Promise.reject(`Ошибка ${result.status}`)
    })
}

export const deleteLike = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(result => {
        if (result.ok) {
            return result.json()
        }

        return Promise.reject(`Ошибка ${result.status}`)
    })
}