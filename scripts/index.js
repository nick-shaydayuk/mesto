popupFormAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardImg = document.getElementById("place-link").value;
  const cardText = document.getElementById("place-name").value;
  renderCard(addCard(cardImg, cardText));
  popupFormAdd.reset();
  popupClose(popupAddPost);
  setSubmitButtonState(false, popupAddSubmitButton);
});

function openCard(e) {
  const cardImg = e.target.src;
  popupCardImg.src = cardImg;
  const cardText = e.target.parentNode.querySelector(".card__text").textContent;
  document.querySelector(".popup-card__img").alt = cardText;
  popupCardText.textContent = cardText;
  openPopup(popupCard);
}

function addCard(cardImg, cardText) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);

  card.querySelector(".card__text").textContent = cardText;
  card.querySelector(".card__img").src = cardImg;

  card.querySelector(".card__img").alt = cardText;

  card.querySelector(".card__img").addEventListener("click", openCard);
  card
    .querySelector(".card__close-button")
    .addEventListener("click", function (e) {
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

function setSubmitButtonState(isFormValid, submitButton) {
  if (isFormValid) {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("popup__submit-button_disabled");
  } else {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add("popup__submit-button_disabled");
  }
}

function renderCard(card) {
  cardsContainer.prepend(card);
}

cardClose.addEventListener("click", function () {
  popupClose(popupCard);
});

function renderEdition() {
  popup.classList.add("popup_active");
}

for (let i = 0; i < initialCards.length; i++) {
  renderCard(addCard(initialCards[i].link, initialCards[i].name));
}

const openPopup = function (popup) {
  popup.classList.add("popup_active");
  const popupContainer = popup.querySelector(".popup__container");
  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      popupClose(popup);
    }
  });
  popup.addEventListener("click", function (e) {
    if (e.target !== popupContainer && e.target === popup) {
      popupClose(popup);
      popup.removeEventListener("click");
    }
  });
};
const popupClose = function (popup) {
  popup.classList.remove("popup_active");
};

popupAddPostOpenBtn.addEventListener("click", function () {
  openPopup(popupAddPost);
});

popupAddPostClose.addEventListener("click", function () {
  popupClose(popupAddPost);
});

popupFormAdd.addEventListener("input", function (e) {
  const isValid = newPlaceName.value.length > 0 && newPlaceUrl.value.length > 0;
  setSubmitButtonState(isValid, popupAddSubmitButton);
});
////////////////////////////////
function showError(input) {
  input.classList.add("popup__input_error");
}

function hideError(input) {
  input.classList.remove("popup__input_error");
}

function checkInputValidity(formInput) {
  if (!formInput.validity.valid) {
    showError(formInput);
  } else {
    hideError(formInput);
  }
}
