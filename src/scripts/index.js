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

const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileTitleElement = document.querySelector('.profile__title')
const profileDescriptionElement = document.querySelector('.profile__description')

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
  imagePopupImage.src = cardImage.src;
  imagePopupImage.alt = cardImage.alt;
  imagePopupCaption.textContent = cardImage.alt;

  openModal(imagePopup);
};

// Обработчики событий для модального окна редактирования профиля
const editFormOpenHandler = () => {
  editForm.elements.name.value = profileName.textContent;
  editForm.elements.description.value = profileDescription.textContent;

  clearValidation(editPopup, validationConfig)
  openModal(editPopup);
};

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();

  saveProfileButton.textContent = 'Сохранение...'

  const formName = editForm.elements.name.value;
  const formDescription = editForm.elements.description.value;

  saveUserInfo(formName, formDescription)
    .then((result) => {
      const profileName = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');

      profileName.textContent = result.name;
      profileDescription.textContent = result.about;

      closeModal(editPopup);
    })
    .catch(error => console.log(error))
    .finally(() => {
      saveProfileButton.textContent = 'Сохранить'
    })
};

// Обработчики событий для модального окна добавления новой карточки

const addCardFormOpenHandler = () => {
  addCardForm.reset();

  clearValidation(addCardPopup, validationConfig);
  openModal(addCardPopup);
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

      closeModal(addCardPopup);
    })
    .catch(error => console.log(error))
    .finally(() => {
      saveCardButton.textContent = 'Сохранить'
    })
};

// Обработчики событий для модального окна обновления аватара

const updateAvatarFormOpenHandler = () => {
  updateAvatarForm.reset();

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

      closeModal(updateAvatarPopup);
    })
    .catch(error => console.log(error))
    .finally(() => {
      saveAvatarButton.textContent = 'Сохранить'
    })
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

const renderInitialData = () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
      createInitialCards(userInfo['_id'], cards)

      pasteUserInfo(userInfo)
    })
    .catch(error => console.log(error))
};

renderInitialData();

enableValidation(validationConfig); 