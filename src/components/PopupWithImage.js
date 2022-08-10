import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector(".popup-card__img");
    this._text = this._popup.querySelector(".popup-card__text");
  }
  open(name, link) {
    this._img.alt = name;
    this._img.src = link;
    this._text.textContent = name;
    super.open();
  }
  
}
