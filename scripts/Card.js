export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector(".card__img");
    this._cardImg.src = this._link;
    this._element.querySelector(".card__text").textContent = this._name;
    this._cardLike = this._element.querySelector(".card__like-button");
    this._cardClose = this._element.querySelector(".card__close-button");
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._cardLike.classList.toggle("card__like-button_active");
    });
    this._cardClose.addEventListener("click", () => {
      this._removeCard()
    });
    this._cardImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _removeCard() {
    this._element.remove()
  }

}
