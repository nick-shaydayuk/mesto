const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const profile = document.querySelector(".profile");
const popupProfile = document.querySelector(".popup-profile");
const popupForm = popupProfile.querySelector(".popup__form");
const closeButton = document.querySelector(".popup__close-button");
const addPostClose = document.querySelector(".popup-add-post__close-button");
const editButton = document.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileText = profile.querySelector(".profile__text");
const inputProfileName = document.getElementById("name");
const inputProfileText = document.getElementById("text");
const popupCard = document.querySelector(".popup-card");
const cardClose = popupCard.querySelector(".popup__close-button");

const popupAddPost = document.querySelector(".popup-add-post");
const popupAddPostOpenBtn = document.querySelector(".profile__add-button");

const cardTemplate = document.querySelector("#card-template").content;
const card = document.querySelector(".card");
const cards = document.querySelector(".cards");

document.querySelector(".popup__form-add").addEventListener("submit", (e) => {
  e.preventDefault();
  const cardImg = document.getElementById("place-link").value;
  const cardText = document.getElementById("place-name").value;
  addCard(cardImg, cardText);
  popupClose(popupAddPost);
});

function openCard(e) {
  const cardImg = e.target.src;
  document.querySelector(".popup-card__img").src = cardImg;
  const cardText = e.target.parentNode.querySelector(".card__text").textContent;
  document.querySelector(".popup-card__img").alt = cardText;
  document.querySelector(".popup-card__text").textContent = cardText;
  popupOpen(popupCard);
}

function addCard(cardImg, cardText) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);

  card.querySelector(".card__text").textContent = cardText;
  card.querySelector(".card__img").src = cardImg;

  /* card.querySelector(".card__img").alt = cardText; */

  card.querySelector(".card__img").addEventListener("click", openCard);
  cards.prepend(card);
}

cardClose.addEventListener("click", function () {
  popupClose(popupCard);
});

function insertName(profileName) {
  inputProfileName.value = profileName;
}
function insertText(profileText) {
  inputProfileText.value = profileText;
}

function renderEdition() {
  popup.classList.toggle("popup_active");
}

function editName(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileText.textContent = inputProfileText.value;
  renderEdition();
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].link, initialCards[i].name);
}

const popupOpen = function (popup) {
  if (popup.classList.contains("popup-profile") === true) {
    insertName(profileName.textContent);
    insertText(profileText.textContent);
    popup.classList.add("popup_active");
  } else {
    popup.classList.add("popup_active");
  }
};
const popupClose = function (popup) {
  if (
    popup.classList.contains("popup-profile") === true ||
    popup.classList.contains("popup-card") === true
  ) {
    popup.classList.add("popup_close");
    setTimeout(() => popup.classList.remove("popup_active"), 300);
    setTimeout(() => popup.classList.remove("popup_close"), 300);
  } else if (popup.classList.contains("popup-add-post") === true) {
    cardImg = "";
    cardText = "";
    popup.classList.add("popup_close");
    setTimeout(() => popup.classList.remove("popup_active"), 300);
    setTimeout(() => popup.classList.remove("popup_close"), 300);
  } else {
  }
};

editButton.addEventListener("click", function () {
  popupOpen(popupProfile);
});
closeButton.addEventListener("click", function () {
  popupClose(popupProfile);
});
popupForm.addEventListener("submit", editName);

popupAddPostOpenBtn.addEventListener("click", function () {
  popupOpen(popupAddPost);
});

addPostClose.addEventListener("click", function () {
  popupClose(popupAddPost);
});

cards.addEventListener("click", function (e) {
  if (!e.target.matches(".card__close-button")) return;
  const cardItem = e.target.closest(".card");
  cardItem.remove();
});

cards.addEventListener("click", function (e) {
  if (!e.target.matches(".card__like-button")) return;
  e.target.classList.toggle("card__like-button_active");
});
