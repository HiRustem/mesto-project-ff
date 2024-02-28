import { createCard, deleteCardFunction, likeCardFunction } from '../components/card';
import { openModal, closeModal, closeModalHandler } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';

import { getUserInfo, getInitialCards, saveUserInfo, saveNewCard, updateAvatar } from '../components/api';

const placesListElement = document.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const updateAvatarPopup = document.querySelector('.popup_type_update-avatar')

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const avatarElement = document.querySelector('.profile__image')

const editForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const updateAvatarForm = document.forms['update-avatar']

const saveProfileButton = editPopup.querySelector('.popup__button')
const saveCardButton = addCardPopup.querySelector('.popup__button')
const saveAvatarButton = updateAvatarPopup.querySelector('.popup__button')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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

  editForm.elements.name.value = name.textContent;
  editForm.elements.description.value = description.textContent;

  clearValidation(editPopup, validationConfig)
  openModal(editPopup);
};

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();

  saveProfileButton.textContent = 'Сохранение...'

  const formName = editForm.elements.name.value;
  const formDescription = editForm.elements.description.value;

  saveUserInfo(formName, formDescription)
    .then(() => {
      const profileName = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');

      profileName.textContent = formName;
      profileDescription.textContent = formDescription;
    })
    .catch(error => console.log(error))
    .finally(() => {
      saveProfileButton.textContent = 'Сохранить'
    })

  closeModal(editPopup);
};

// Обработчики событий для модального окна добавления новой карточки

const addCardFormOpenHandler = () => {
  addCardForm.elements['place-name'].value = ''
  addCardForm.elements.link.value = ''

  clearValidation(addCardPopup, validationConfig)
  openModal(addCardPopup)
}

const addCardFormSubmitHandler = (evt) => {
  evt.preventDefault();

  saveCardButton.textContent = 'Сохранение...'

  const placeName = addCardForm.elements['place-name'].value;
  const link = addCardForm.elements['link'].value;

  Promise.all([getUserInfo(), saveNewCard(placeName, link)])
    .then(([userInfo, card]) => {
      const newCard = createCard(
        userInfo['_id'],
        card,
        deleteCardFunction,
        likeCardFunction,
        openImagePopup
      );
      placesListElement.prepend(newCard);
    })
    .catch(error => console.log(error))
    .finally(() => {
      saveCardButton.textContent = 'Сохранить'
    })

  addCardForm.reset();
  closeModal(addCardPopup);
};

// Обработчики событий для модального окна обновления аватара

const updateAvatarFormOpenHandler = () => {
  updateAvatarForm.elements.link.value = ''

  clearValidation(updateAvatarPopup, validationConfig)
  openModal(updateAvatarPopup)
}

const updateAvatarFormSubmitHandler = (evt) => {
  evt.preventDefault()

  saveAvatarButton.textContent = 'Сохранение...'

  const newUrl = updateAvatarForm.elements.link.value

  updateAvatar(newUrl)
    .then(result => {
      avatarElement.style = `background-image: url(${result.avatar});`
    })
    .catch(error => console.log(error))
    .finally(() => {
      saveAvatarButton.textContent = 'Сохранить'
    })

  closeModal(updateAvatarPopup)
}

// Слушатели событий для модального окна редактирования профиля

editProfileButton.addEventListener('click', editFormOpenHandler);
editForm.addEventListener('submit', editFormSubmitHandler);
editPopup.addEventListener('click', closeModalHandler);

// Слушатели событий для модального окна добавления новой карточки

addCardButton.addEventListener('click', addCardFormOpenHandler);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
addCardPopup.addEventListener('click', closeModalHandler);

// Слушатели событий для модального окна картинки карточек

imagePopup.addEventListener('click', closeModalHandler);

// Слушатели событий для модального окна обновления аватара

avatarElement.addEventListener('click', updateAvatarFormOpenHandler)
updateAvatarForm.addEventListener('submit', updateAvatarFormSubmitHandler)
updateAvatarPopup.addEventListener('click', closeModalHandler)

// Вспомогательные методы

const pasteUserInfo = (userInfo) => {
  const profileTitleElement = document.querySelector('.profile__title')
  const profileDescriptionElement = document.querySelector('.profile__description')

  avatarElement.style = `background-image: url(${userInfo.avatar});`
  profileTitleElement.textContent = userInfo.name
  profileDescriptionElement.textContent = userInfo.about
}

const createInitialCards = (userId, cards) => {
  for (let card of cards) {
    const newCard = createCard(
      userId,
      card,
      deleteCardFunction,
      likeCardFunction,
      openImagePopup
    );
    placesListElement.append(newCard);
  }
}

// Инициализация карточек

const initCards = () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
      createInitialCards(userInfo['_id'], cards)

      pasteUserInfo(userInfo)
    })
    .catch(error => console.log(error))
};

initCards();

enableValidation(validationConfig); 