import { initialCards } from "./cards.js";
import Card from "./Card";
import FormValidator from "./validate";

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
const cardsContainer = document.querySelector(".cards");

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

function createCard(data) {
  const card = new Card(data, '#card-template', openCard)
  return card.generateCard()
}

popupFormAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardImg = document.getElementById("place-link").value;
  const cardText = document.getElementById("place-name").value;
  const data = {
    name: cardText,
    link: cardImg,
  };

  addCard();
  popupFormAdd.reset();
  popupAddSubmitButton.setAttribute("disabled", true);
  popupAddSubmitButton.classList.add("popup__submit-button_disabled");
  closePopup(popupAddPost);
});

function openCard(e) {
  const cardImg = e.target.src;
  popupCardImg.src = cardImg;
  const cardText = e.target.parentNode.querySelector(".card__text").textContent;
  popupCardImg.alt = cardText;
  popupCardText.textContent = cardText;
  openPopup(popupCard);
}

/* function createCard(cardImg, cardText) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".card__text").textContent = cardText;
  const cardElement = card.querySelector(".card__img")
  cardElement.src = cardImg;
  cardElement.alt = cardText;
  cardElement.addEventListener("click", openCard);
  card
    .querySelector(".card__close-button")
    .addEventListener("click", function (e) { // в прошлом спринте выносил обработчик на весь контейнер. сказали переделывать :)))
      const cardItem = e.target.closest(".card");
      cardItem.remove();
    });
  card
    .querySelector(".card__like-button")
    .addEventListener("click", function (e) {
      e.target.classList.toggle("card__like-button_active");
    });
  return card;
} */

function addCard(card) {
  cardsContainer.prepend(card);
}

cardClose.addEventListener("click", function () {
  closePopup(popupCard);
});

for (let i = 0; i < initialCards.length; i++) {
  addCard(createCard(initialCards[i]));
}

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
  if (e.target !== popupContainer && e.target === openedPopup) {
    closePopup(openedPopup);
  }
}

const closePopup = function (popup) {
  popup.classList.remove("popup_active");
  popup.removeEventListener("click", closePopup);
  document.removeEventListener("keydown", closeByEsc);
};

popupAddPostOpenBtn.addEventListener("click", function () {
  openPopup(popupAddPost);
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

popupProfileSubmitButton.addEventListener("click", function (evt) {
  editName(evt);
});
