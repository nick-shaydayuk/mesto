import './index.css'

import { initialCards } from "./utils/cards.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Popup from './components/Popup';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import Section from './components/Section';
import UserInfo from './components/UserInfo';

const profile = document.querySelector(".profile");
const popupProfile = document.querySelector(".popup-profile");
const popupProfileButtonClose = document.querySelector(
  ".popup-profile__close-button"
);
const popupAddPostClose = document.querySelector(
  ".popup-add-post__close-button"
);
const profileEditButton = document.querySelector(".profile__edit-button");

const popupCard = document.querySelector(".popup-card");
const popupCardImg = popupCard.querySelector(".popup-card__img");
const popupCardText = popupCard.querySelector(".popup-card__text");
const cardClose = popupCard.querySelector(".popup-card__close-button");

const popupAddPost = document.querySelector(".popup-add-post");
const popupAddPostOpenBtn = document.querySelector(".profile__add-button");

const cardTemplate = document.querySelector("#card-template").content;
const card = document.querySelector(".card");
const cardsContainer = ".cards";


const popupFormAdd = document.forms.popup__form_add;

const newPlaceName = popupFormAdd.elements.placename;
const newPlaceUrl = popupFormAdd.elements.placeurl;
const popupAddSubmitButton = document.querySelector(
  ".popup-add-post__submit-button"
);
const formAddError = popupFormAdd.querySelector(`.${newPlaceUrl.id}-error`);

const popupFormProfile = document.forms.profile;
const inputProfileName = popupFormProfile.elements.profileName;
const inputProfileText = popupFormProfile.elements.profileText;
const popupProfileSubmitButton = document.querySelector(
  ".popup-profile__submit-button"
);
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");

const ESC_CODE = "Escape";

const formConfig = {
  formSelector: '.popup__form', //форма
  inputSelector: '.popup__input', //input формы
  submitButtonSelector: '.popup__submit-button', //кнопка формы
  inactiveButtonClass: 'popup__submit-button_disabled', //кнопка неактивна
  inputErrorClass: 'popup__input_error', //стиль input при ошибке
  errorClass: 'form__input-error_active'
}

const cardFormValidator = new FormValidator(formConfig, popupFormAdd)
cardFormValidator.enableValidation()

const profileEditValidator = new FormValidator(formConfig, popupFormProfile)
profileEditValidator.enableValidation()

function createCard(data) {
  const card = new Card(data, '#card-template', openCard)
  return card.generateCard()
}

popupFormAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  let cardImg = document.querySelector("#place-link").value;
  let cardText = document.querySelector("#place-name").value;
  const data = {
    name: cardText,
    link: cardImg,
  };

  addCard(createCard(data));
  popupFormAdd.reset();
  closePopup(popupAddPost);
});

function openCard(name, link) {
  popupCardImg.src = link;
  popupCardImg.alt = name;
  popupCardText.textContent = name;
  openPopup(popupCard);
}

const cardList = new Section({
  data: initialCards,
    renderer: (cardItem) => {
      prependCard(createCard(cardItem));
    }
  },
  cardsContainer
)

cardList.renderItems()

function addCard(card) {
  cardsContainer.prepend(card);
}

cardClose.addEventListener("click", function () {
  closePopup(popupCard);
});

/* for (let i = 0; i < initialCards.length; i++) {
  addCard(createCard(initialCards[i]));
} */

const openPopup = function (popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", closeByOverlay);
};

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

function closeByOverlay(e) {
  const openedPopup = document.querySelector(".popup_active");
  const popupContainer = openedPopup.querySelector(".popup__container");
  const popupCardContainer = openedPopup.querySelector(".popup-card__container");
  const popupCloseButton = openedPopup.querySelector(".popup__close-button");
  if (e.target === popupCloseButton) {
    return;
  } else if ((e.target !== popupContainer || e.target !== popupCardContainer) && e.target === openedPopup && e.target !== popupCloseButton) {
    closePopup(openedPopup);
  }
}

const closePopup = function (popup) {
  popup.classList.remove("popup_active");
  popup.removeEventListener("click", closeByOverlay);
  document.removeEventListener("keydown", closeByEsc);
};

popupAddPostOpenBtn.addEventListener("click", function () {
  openPopup(popupAddPost);
  cardFormValidator.resetFormValidator()
});

popupAddPostClose.addEventListener("click", function () {
  closePopup(popupAddPost);
});

function insertName(profileName) {
  inputProfileName.value = profileName.textContent;
}

function insertText(profileText) {
  inputProfileText.value = profileText.textContent;
}

function editName(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileText.textContent = inputProfileText.value;
  closePopup(popupProfile);
}

profileEditButton.addEventListener("click", function () {
  insertName(profileName);
  insertText(profileText);
  openPopup(popupProfile);
});

popupProfileButtonClose.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupFormProfile.addEventListener("submit", function (evt) {
  editName(evt);
});

/* const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}; */

