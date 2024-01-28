// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesListElement = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const deleteCardFunction = card => card.remove();

const createCard = (card, deleteFunction) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = `Фото ${card.name}`;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteFunction(cardElement));

  return cardElement;
};

const initCards = () => {
  for (let card of initialCards) {
    const newCard = createCard(card, deleteCardFunction);
    placesListElement.append(newCard);
  }
};

initCards();
