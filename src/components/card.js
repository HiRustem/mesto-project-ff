const cardTemplate = document.querySelector('#card-template').content;

export const deleteCardFunction = (card) => card.remove();

export const likeCardFunction = (likeElement) => {
  likeElement.classList.toggle('card__like-button_is-active')
};

export const createCard = (
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

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteFunction(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeFunction(likeButton));

  return cardElement;
};
