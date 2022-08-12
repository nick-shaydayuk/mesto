import "./index.css";

import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

const popupProfileSelector = ".popup-profile";

const profileEditButton = document.querySelector(".profile__edit-button");

const popupAddPostSelector = ".popup-add-post";
const popupAddPostOpenBtn = document.querySelector(".profile__add-button");

const cardsContainer = ".cards";

const popupFormAdd = document.forms.popup__form_add;

const popupFormProfile = document.forms.profile;

const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");

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

const userData = new UserInfo({name: profileName, text: profileText});

const popupProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitHandler: (values) => {
    userData.setUserInfo(values);
  },
}
);

const cardList = new Section(
  { items: initialCards, renderer: (data) => {
    cardList.prependCard(createCard(data));
  } },
  cardsContainer
);

const popupAddPost = new PopupWithForm({
  popupSelector: popupAddPostSelector,
  submitHandler: (data) => {
    cardList.prependCard(createCard(data));
    popupFormAdd.reset();
  },
});


const popupCard = new PopupWithImage(".popup-card");

function createCard(data) {
  const card = new Card(data, "#card-template", openCard);
  return card.generateCard();
}

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

cardList.renderItems() 

popupProfile.setEventListeners();

popupAddPost.setEventListeners();

popupCard.setEventListeners();

// Спасибо, поправил :)