export default class Card {
  constructor(
    { name, link, likes, _id, userId, ownerId },
    templateSelector,
    handleCardClick,
    handleCardRemove,
    handleCardLike,
    handleCardUnlike,
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = _id;
    this._ownerId = ownerId;
    this._userProperty = userId === ownerId;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._handleCardLike = handleCardLike;
    this._handleCardUnlike = handleCardUnlike;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector(".card__img");
    this._cardImg.src = this._link;
    this._element.querySelector(".card__text").textContent = this._name;
    this._cardLike = this._element.querySelector(".card__like-button");
    this._cardClose = this._element.querySelector(".card__close-button");
    this._counter = this._element.querySelector('.card__like-counter');
    this._setEventListeners();
    this._counter.textContent = this._likes.length;
    return this._element;
  }

  updateLikes() {
    if (!this._likes === undefined) {
      if(this._likes.length > 0) {
        this._counter.textContent = this._likes.length;
      } else {
        this._counter.textContent = 0;
      }
    } else {
      this._counter.textContent = 0;
    }
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      if(this._cardLike.classList.contains("card__like-button_active")) {
        this._handleCardUnlike({id: this._cardId, likeElement: this._cardLike, counter: this._counter})
      } else {
        this._handleCardLike({id: this._cardId, likeElement: this._cardLike, counter: this._counter})
      }
    });
    if (!this._userProperty) {
      this._cardClose.remove();
    } else {
      this._cardClose.addEventListener("click", () => {
        this._handleCardRemove({element: this._element, cardId: this._cardId});
      });
    }
    this._cardImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _removeCard() {
    this._element.remove();
  }
}
