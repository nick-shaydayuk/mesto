popupFormAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardImg = document.getElementById("place-link").value;
  const cardText = document.getElementById("place-name").value;
  addCard(createCard(cardImg, cardText));
  popupFormAdd.reset();
  popupAddSubmitButton.setAttribute("disabled", true);
  popupAddSubmitButton.classList.add("popup__submit-button_disabled")
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

function createCard(cardImg, cardText) {
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
}

function addCard(card) {
  cardsContainer.prepend(card);
}

cardClose.addEventListener("click", function () {
  closePopup(popupCard);
});

for (let i = 0; i < initialCards.length; i++) {
  addCard(createCard(initialCards[i].link, initialCards[i].name));
}

const openPopup = function (popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", closeByOverlay);
};

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup); 
  }
} 

function closeByOverlay(e) {
  const openedPopup = document.querySelector('.popup_active');
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




