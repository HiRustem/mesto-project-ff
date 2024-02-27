import { deleteCard, putLike, deleteLike } from './api';

const cardTemplate = document.querySelector('#card-template').content;

export const deleteCardFunction = (cardId, cardElement) => {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(error => console.log(error))
}

export const likeCardFunction = (userId, card, likeButton, likesElement) => {
  const findUser = card.likes.find(user => user['_id'] === userId)

  if (findUser) {
    deleteLike(card['_id'])
      .then(result => {
        likesElement.textContent = result.likes.length
        likeButton.classList.remove('card__like-button_is-active')
      })
      .catch(error => console.log(error))   
  } else {
    putLike(card['_id'])
      .then(result => {
        likesElement.textContent = result.likes.length
        likeButton.classList.add('card__like-button_is-active')
      })
      .catch(error => console.log(error))
  }
};

export const createCard = (
  userId,
  card,
  deleteFunction,
  likeFunction,
  openImagePopupFunction
) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener('click', () => openImagePopupFunction(cardImage));

  if (userId === card.owner['_id']) {
    const deleteButton = document.createElement('button');

    deleteButton.classList.add('card__delete-button');
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", "Кнопка удаления");
    deleteButton.addEventListener('click', () => deleteFunction(card['_id'], cardElement));

    cardImage.after(deleteButton)
  }

  const likesElement = cardElement.querySelector('.card_likes');
  likesElement.textContent = card.likes.length

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeFunction(userId, card, likeButton, likesElement));

  const findUser = card.likes.find(user => user['_id'] === userId)

  if (findUser) {
    likeButton.classList.add('card__like-button_is-active')
  }

  return cardElement;
};
