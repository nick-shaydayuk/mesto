import Popup from "./Popup";

export default class PopupRemover extends Popup {
  constructor({popupSelector, deleteCardHandler}) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._deleteCardHandler = deleteCardHandler;
  }

  open({element, cardId}) {
    this._element = element;
    this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._element.remove();
      this.close();
      console.log(this._cardId);
      this._deleteCardHandler({cardId: this._cardId})
    });
  }
}