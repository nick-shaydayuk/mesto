import "./index.css";

import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

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

const newPlaceName = popupFormAdd.elements.name;
const newPlaceUrl = popupFormAdd.elements.link;
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

const userData = new UserInfo({name: profileName, text: profileText});



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
  { items: initialCards, renderer: (data) => {
    cardList.prependCard(createCard(data));
  } },
  cardsContainer
);

cardList.renderItems() 


const popupProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitHandler: (values) => {
    userData.setUserInfo(values);
  },
}
);
popupProfile.setEventListeners();

const popupAddPost = new PopupWithForm({
  popupSelector: popupAddPostSelector,
  submitHandler: (data) => {
    cardList.prependCard(createCard(data));
    popupFormAdd.reset();
  },
});
popupAddPost.setEventListeners();

const popupCard = new PopupWithImage(".popup-card");
popupCard.setEventListeners();

function openCard(name, link) {
  popupCard.open(name, link);
}

profileEditButton.addEventListener("click", function () {
  popupProfile.setInputValues(userData.getUserInfo());
  profileEditValidator.resetFormValidator();
  popupProfile.open();
});

popupAddPostOpenBtn.addEventListener("click", function () {
  cardFormValidator.resetFormValidator(); 
  popupAddPost.open();
});

// Евгений, подскажите пожалуйста, каким образом лучше отсортировать код, чтобы не было беспорядка? может есть какие-то стандарты или статьи? голова пока не подсказывает, какой способ лучше, ели тему понимаю :))