// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const deleteCardHandler = event => event.target.parentElement.remove();

const createCard = (cardName, cardLink, deleteHandler) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', `Фото ${cardName}`);

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteHandler);

  return cardElement
};

const initCards = () => {
  const placesListElement = document.querySelector('.places__list');

  for (let card of initialCards) {
    const newCard = createCard(card.name, card.link, deleteCardHandler);
    placesListElement.append(newCard);
  }
};

initCards();
