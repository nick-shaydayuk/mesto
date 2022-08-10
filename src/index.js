import "./index.css";

import { initialCards } from "./utils/cards.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Popup from "./components/Popup";
import PopupWithForm from "./components/PopupWithForm";
import PopupWithImage from "./components/PopupWithImage";
import Section from "./components/Section";
import UserInfo from "./components/UserInfo";

const popupProfileSelector = ".popup-profile";

const profile = document.querySelector(".profile");
const popupProfileButtonClose = document.querySelector(
  ".popup-profile__close-button"
);
const popupAddPostClose = document.querySelector(
  ".popup-add-post__close-button"
);
const profileEditButton = document.querySelector(".profile__edit-button");

const popupCardSelector = ".popup-card";

const popupAddPostSelector = ".popup-add-post";
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

const userData = new UserInfo({name: profileName, text: profileText}, {inputName: inputProfileName, inputText: inputProfileText});

const ESC_CODE = "Escape";

const formConfig = {
  formSelector: ".popup__form", //форма
  inputSelector: ".popup__input", //input формы
  submitButtonSelector: ".popup__submit-button", //кнопка формы
  inactiveButtonClass: "popup__submit-button_disabled", //кнопка неактивна
  inputErrorClass: "popup__input_error", //стиль input при ошибке
  errorClass: "form__input-error_active",
};

const cardFormValidator = new FormValidator(formConfig, popupFormAdd);
cardFormValidator.enableValidation();

const profileEditValidator = new FormValidator(formConfig, popupFormProfile);
profileEditValidator.enableValidation();

function createCard(data) {
  const card = new Card(data, "#card-template", openCard);
  return card.generateCard();
}

const cardList = new Section(
  { items: initialCards, renderer: addCard },
  cardsContainer
);

const popupProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitHandler: (e) => {
    /* editName(e); */
    userData.setUserInfo();
  },
});

const popupAddPost = new PopupWithForm({
  popupSelector: popupAddPostSelector,
  submitHandler: () => {
    let cardImg = document.querySelector("#place-link").value;
    let cardText = document.querySelector("#place-name").value;
    const data = {
      name: cardText,
      link: cardImg,
    };

    addCard(createCard(data));
    popupFormAdd.reset();
  },
});

const popupCard = new PopupWithImage(".popup-card");

function openCard(name, link) {
  popupCard.open(name, link);
}

function addCard(card) {
  cardList.prependCard(card);
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(createCard(initialCards[i]));
}

profileEditButton.addEventListener("click", function () {
  userData.getUserInfo()
  popupProfile.open();
});

popupProfileButtonClose.addEventListener("click", function () {
  popupProfile.close();
});
