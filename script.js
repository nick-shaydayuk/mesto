let profile = document.querySelector(".profile");
let card = document.querySelector(".card");
let like = card.querySelector(".card__likeButton");
let popup = document.querySelector(".popup");
let submitButton = popup.querySelector(".popup__submitButton");
let closeButton = document.querySelector(".popup__closeButton");
let editButton = document.querySelector(".profile__edit-button");
let profileName = profile.querySelector(".profile__name");
let profileText = profile.querySelector(".profile__text");
let inputProfileName = popup.querySelector("#name");
let inputProfileText = popup.querySelector("#text");

function insertName(profileName) {
  inputProfileName.value = profileName;
};
function insertText(profileText) {
  inputProfileText.value = profileText;
};
insertName(profileName.textContent);
insertText(profileText.textContent);

function renderEdition() {
  popup.classList.toggle("popup_active");
};

function editName(evt) {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value
    profileText.textContent = inputProfileText.value
    renderEdition();
};

function popupOpen() {
  popup.classList.toggle("popup_active");
};
function popupClose() {
  popup.classList.toggle("popup_active");
};

function activeLike() {
    like.classList.toggle("card__likeButton_active")
}
editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupClose);
submitButton.addEventListener("click", editName);
like.addEventListener("click", activeLike)