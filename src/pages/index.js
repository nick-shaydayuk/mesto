import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupRemover from "../components/PopupRemover";

import {
  popupProfileSelector,
  profileEditButton,
  avatarEditButton,
  popupFormAvatar,
  popupAddPostSelector,
  popupAddPostOpenBtn,
  popupEditAvatarSelector,
  cardsContainer,
  popupFormAdd,
  popupFormProfile,
  profileName,
  profileText,
  avatar,
  formConfig,
} from "../utils/constants";

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
  submitHandler: ({ name, about }, buttonElement, popupElement) => {
    buttonElement.textContent = "Сохранение...";
    api.setUserInfo({ name, about }).then(() => {
      userData.setUserInfo({ name, about });
    }).finally(() => {
      buttonElement.textContent = "Сохранить";
    }).catch(() => {
      alert('ohhh shiiiiit')
    });
    popupElement.close();
  },
});

const popupAddPost = new PopupWithForm({
  popupSelector: popupAddPostSelector,
  submitHandler: (data, buttonElement, popupElement) => {
    buttonElement.textContent = "Создание...";
    api.createCard({
      name: data.name,
      link: data.link
    }).then((res) => {
      cardList.prependCard(
        createCard(res)
      );
    }).finally(() => {
      buttonElement.textContent = "Сохранить";
    }).catch(() => {
      alert('ohhh shiiiiit')
    });
    popupElement.close();
    popupFormAdd.reset();
    buttonElement.textContent = "Создать";
  },
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  submitHandler: (avatar, buttonElement, popupElement) => {
    buttonElement.textContent = "Сохранение...";
    api.setUserAvatar(avatar).then(() => {
      userData.setAvatar(avatar);
      buttonElement.textContent = "Сохранить";
    }).finally(() => {
      buttonElement.textContent = "Сохранить";
    }).catch(() => {
      alert('ohhh shiiiiit')
    });
    popupElement.close();
  },
});

const popupCard = new PopupWithImage(".popup-card");

const popupRemover = new PopupRemover({
  popupSelector: ".popup-remover",
  deleteCardHandler: ({ cardId, element, popupElement }) => {
    api.deleteCard({ id: cardId }).then(() => {
      element.remove();
      popupElement.close();
    }).catch(() => {
      alert('ohhh shiiiiit')
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

function handleCardLike({ id, likeElement, counter }) {
  api.addLike({ id: id }).then((res) => {
    likeElement.classList.add("card__like-button_active");
    counter.textContent = res.likes.length;    
  });
}

function handleCardUnlike({ id, likeElement, counter }) {
  api.removeLike({ id: id }).then((res) => {
    likeElement.classList.remove("card__like-button_active");
    counter.textContent = res.likes.length;
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
