
const parametrs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  formFieldset: '.popup__fieldset',
  openButtonSelector:'button',
};

const optionsForApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '856155f9-12e9-47dc-bda9-cdcb166629fd',
    'Content-Type': 'application/json'
  },
  dir: {
    usersMe: '/users/me',
    cards: '/cards',
    likes: '/cards/likes',
    avatar: '/users/me/avatar',
  }
}

export default optionsForApi;

