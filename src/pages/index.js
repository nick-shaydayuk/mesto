import "./index.css";

import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupRemover from "../components/PopupRemover";

const popupProfileSelector = ".popup-profile";

const profileEditButton = document.querySelector(".profile__edit-button");

const avatarEditButton = document.querySelector(".profile__avatar-container");
const popupFormAvatar = document.querySelector(".popup__form-avatar");

const popupAddPostSelector = ".popup-add-post";
const popupAddPostOpenBtn = document.querySelector(".profile__add-button");
const popupEditAvatarSelector = ".popup-edit-avatar";

const cardsContainer = ".cards";

const popupFormAdd = document.forms.popup__form_add;

const popupFormProfile = document.forms.profile;

const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const avatar = document.querySelector(".profile__avatar");

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

const avatarEditValidator = new FormValidator(formConfig, popupFormAvatar);
avatarEditValidator.enableValidation();

const userData = new UserInfo({name: profileName, text: profileText, avatar: avatar});

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

const popupEditAvatar = new PopupWithForm ({
  popupSelector: popupEditAvatarSelector,
  submitHandler: (values) => {
    userData.setAvatar(values);
  }
})

const popupCard = new PopupWithImage(".popup-card");

const popupRemover = new PopupRemover({popupSelector: ".popup-remover"})

function createCard(data) {
  const card = new Card(data, "#card-template", openCard, openPopupRemove);
  return card.generateCard();
}

function openCard(name, link) {
  popupCard.open(name, link);
}

function openPopupRemove(element) {
  popupRemover.open(element)
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

avatarEditButton.addEventListener("click", function (){
  popupEditAvatar.setInputValues(userData.getUserInfo());  
  avatarEditValidator.resetFormValidator();
  popupEditAvatar.open()
})

cardList.renderItems() 

popupEditAvatar.setEventListeners();

popupProfile.setEventListeners();

popupAddPost.setEventListeners();

popupCard.setEventListeners();

popupRemover.setEventListeners()