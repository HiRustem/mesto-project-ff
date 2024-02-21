import { initialCards } from './cards';
import { createCard, deleteCardFunction, likeCardFunction } from '../components/card';
import { openModal, closeModal, closeModalHandler } from '../components/modal';

const placesListElement = document.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];

// Функция показа модального окна картинки карточки

const openImagePopup = (cardImage) => {
  const image = imagePopup.querySelector('.popup__image');
  const caption = imagePopup.querySelector('.popup__caption');

  image.src = cardImage.src;
  image.alt = cardImage.alt;
  caption.textContent = cardImage.alt;

  openModal(imagePopup);
};

// Обработчики событий для модального окна редактирования профиля
const editFormOpenHandler = () => {
  const name = document.querySelector('.profile__title');
  const description = document.querySelector('.profile__description');

  const form = document.forms['edit-profile'];
  form.elements.name.value = name.textContent;
  form.elements.description.value = description.textContent;

  openModal(editPopup);
};

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const formName = editForm.elements.name.value;
  const formDescription = editForm.elements.description.value;

  profileName.textContent = formName;
  profileDescription.textContent = formDescription;

  closeModal(editPopup);
};

// Обработчики событий для модального окна добавления новой карточки

const addCardFormSubmitHandler = (evt) => {
  evt.preventDefault();

  const placeName = addCardForm.elements['place-name'].value;
  const link = addCardForm.elements['link'].value;

  const cardObject = {
    name: placeName,
    link: link,
  };

  const newCard = createCard(
    cardObject,
    deleteCardFunction,
    likeCardFunction,
    openImagePopup
  );
  placesListElement.prepend(newCard);

  addCardForm.reset();
  closeModal(addCardPopup);
};

// Слушатели событий для модального окна редактирования профиля

editProfileButton.addEventListener('click', editFormOpenHandler);
editForm.addEventListener('submit', editFormSubmitHandler);
editPopup.addEventListener('click', closeModalHandler);

// Слушатели событий для модального окна добавления новой карточки

addCardButton.addEventListener('click', () => openModal(addCardPopup));
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
addCardPopup.addEventListener('click', closeModalHandler);

// Слушатели событий для модального окна картинки карточек

imagePopup.addEventListener('click', closeModalHandler);

// Инициализация карточек

const initCards = () => {
  for (let card of initialCards) {
    const newCard = createCard(
      card,
      deleteCardFunction,
      likeCardFunction,
      openImagePopup
    );
    placesListElement.append(newCard);
  }
};

initCards();
