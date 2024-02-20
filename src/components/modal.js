const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
};

export const openModal = (modalElement) => {
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
};

export const closeModal = (modalElement) => {
  modalElement.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', keyHandler);
};

export const closeModalHandler = (evt, element) => {
  if (
    evt.target.classList.contains('popup__close') ||
    evt.target === evt.currentTarget
  ) {
    closeModal(element);
  }
};
