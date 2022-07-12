const profile = document.querySelector(".profile");
const popupProfile = document.querySelector(".popup-profile");
const popupFormProfile = popupProfile.querySelector(".popup__form");
const buttonClose = document.querySelector(".popup__close-button");
const popupAddPostClose = document.querySelector(".popup-add-post__close-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileText = profile.querySelector(".profile__text");
const inputProfileName = document.getElementById("name");
const inputProfileText = document.getElementById("text");
const popupCard = document.querySelector(".popup-card");
const popupCardImg = popupCard.querySelector(".popup-card__img");
const popupCardText = popupCard.querySelector(".popup-card__text");
const cardClose = popupCard.querySelector(".popup__close-button");

const popupAddPost = document.querySelector(".popup-add-post");
const popupAddPostOpenBtn = document.querySelector(".profile__add-button");

const cardTemplate = document.querySelector("#card-template").content;
const card = document.querySelector(".card");
const cardsContainer = document.querySelector(".cards");
const popupFormAdd = document.querySelector(".popup__form_add")