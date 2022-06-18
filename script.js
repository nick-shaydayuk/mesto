let profile = document.querySelector(".profile");
let card = document.querySelector(".card");
/* let like = card.querySelector(".card__like-button"); */
let popup = document.querySelector(".popup");
let popupForm = popup.querySelector(".popup__form")
let closeButton = document.querySelector(".popup__close-button");
let editButton = document.querySelector(".profile__edit-button");
let profileName = profile.querySelector(".profile__name");
let profileText = profile.querySelector(".profile__text");
let inputProfileName = popup.querySelector("#name");
let inputProfileText = popup.querySelector("#text");

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

function popupOpen() {
  popup.classList.toggle("popup_active");
  insertName(profileName.textContent);
  insertText(profileText.textContent);
}
function popupClose() {
  popup.classList.toggle("popup_active");
}

function activeLike() {
  like.classList.toggle("card__likeButton_active");
}
editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupClose);
popupForm.addEventListener("submit", editName);
like.addEventListener("click", activeLike);
