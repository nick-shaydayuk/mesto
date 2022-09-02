import "./index.css";

import Api from "../components/Api.js";
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
const popupEditAvatarSelector = ".popup-avatar";

const cardsContainer = ".cards";

const popupFormAdd = document.forms.popup__form_add;

const popupFormProfile = document.forms.profile;

const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const avatar = document.querySelector(".profile__avatar");

let cardLikeCheck

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

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-49/",
  headers: {
    authorization: "98c074a7-bba0-4568-b638-f65388faf7b9",
    "Content-Type": "application/json",
  },
});

const userData = new UserInfo({
  name: profileName,
  about: profileText,
  avatar: avatar,
});

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = cardCreate(item);
      return card;
    },
  },
  cardsContainer
);

const popupProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitHandler: ({ name, about }) => {
    api.setUserInfo({ name, about }).then(() => {
      userData.setUserInfo({ name, about });
    });
  },
});

const popupAddPost = new PopupWithForm({
  popupSelector: popupAddPostSelector,
  submitHandler: (data, buttonElement) => {
    buttonElement.textContent = 'Создание...'
    let userId = userData.getUserId();
    cardList.appendCard(
      createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        userId: userId,
        ownerId: userId,
      })
    );
    api.createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      _id: data._id,
      userId: userId,
      ownerId: userId,
    });
    popupFormAdd.reset();
    buttonElement.textContent = 'Создать'
  },
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  submitHandler: ({ avatar }) => {
    api.setUserAvatar({ avatar }).then(() => {
      userData.setAvatar({ avatar });
    });
  },
});

const popupCard = new PopupWithImage(".popup-card");

const popupRemover = new PopupRemover({
  popupSelector: ".popup-remover",
  deleteCardHandler: ({ cardId, element, popupElement }) => {
    api.deleteCard({ id: cardId }).then(() => {
      element.remove();
      popupElement.close();
    });
  },
});

function createCard({ name, link, likes, _id, userId, ownerId }) {
  const card = new Card(
    { name, link, likes, _id, userId, ownerId },
    "#card-template",
    openCard,
    openPopupRemove,
    handleCardLike,
    handleCardUnlike
  );
  return card.generateCard();
}

function handleCardLike({ id, likeElement, counter, likes, card }) {
  api.addLike({ id: id }).then(() => {
    likeElement.classList.add("card__like-button_active");
    counter.textContent = likes.length;
    card.updateLikes();
  });
}

function handleCardUnlike({ id, likeElement, counter, likes, card }) {
  api.removeLike({ id: id }).then(() => {
    likeElement.classList.remove("card__like-button_active");
    counter.textContent = likes.length;
    card.updateLikes();
  });
}

function openCard(name, link) {
  popupCard.open(name, link);
}

function openPopupRemove({ element: element, cardId: cardId }) {
  popupRemover.open({ element: element, cardId: cardId });
}

profileEditButton.addEventListener("click", function () {
  api.getUser().then((userData) => {
    popupProfile.setInputValues({
      name: userData.name,
      about: userData.about,
    });
    profileEditValidator.resetFormValidator();
    popupProfile.open();
  });
});

popupAddPostOpenBtn.addEventListener("click", function () {
  cardFormValidator.resetFormValidator();
  popupAddPost.open();
});

avatarEditButton.addEventListener("click", function () {
  popupEditAvatar.setInputValues(userData.getUserInfo());
  avatarEditValidator.resetFormValidator();
  popupEditAvatar.open();
});

popupEditAvatar.setEventListeners();

popupProfile.setEventListeners();

popupAddPost.setEventListeners();

popupCard.setEventListeners();

popupRemover.setEventListeners();

let userId;

api
  .getAllData()
  .then(([data, user]) => {
    userId = user._id;
    userData.setUserInfo({ name: user.name, about: user.about, _id: userId });
    userData.setAvatar({ avatar: user.avatar });

    data.forEach((item) => {
      cardList.prependCard(
        createCard({
          name: item.name,
          link: item.link,
          likes: item.likes,
          _id: item._id,
          userId: userId,
          ownerId: item.owner._id,
        })
      );
    });
  })
  .catch((err) => console.log(err));
