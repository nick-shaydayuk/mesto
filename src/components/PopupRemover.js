import Popup from "./Popup";

export default class PopupRemover extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  open(element) {
    this._element = element;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._element.remove();
      this.close();
    });
  }
}
