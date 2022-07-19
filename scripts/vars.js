const profile = document.querySelector(".profile");
const popupProfile = document.querySelector(".popup-profile");
const buttonClose = document.querySelector(".popup__close-button");
const popupAddPostClose = document.querySelector(".popup-add-post__close-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupCard = document.querySelector(".popup-card");
const popupCardImg = popupCard.querySelector(".popup-card__img");
const popupCardText = popupCard.querySelector(".popup-card__text");
const cardClose = popupCard.querySelector(".popup__close-button");

const popupAddPost = document.querySelector(".popup-add-post");
const popupAddPostOpenBtn = document.querySelector(".profile__add-button");

const cardTemplate = document.querySelector("#card-template").content;
const card = document.querySelector(".card");
const cardsContainer = document.querySelector(".cards");

const popupFormAdd = document.forms.popup__form_add  

const newPlaceName = popupFormAdd.elements.placename 
const newPlaceUrl = popupFormAdd.elements.placeurl
const popupAddSubmitButton = document.querySelector('.popup-add-post__submit-button')
const formAddError = popupFormAdd.querySelector(`.${newPlaceUrl.id}-error`)

const popupFormProfile = document.forms.profile
const inputProfileName = popupFormProfile.elements.profileName;
const inputProfileText = popupFormProfile.elements.profileText;
const popupProfileSubmitButton = document.querySelector('.popup-profile__submit-button')
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');



