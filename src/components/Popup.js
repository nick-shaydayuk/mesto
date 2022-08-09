export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_active");
  }

  close() {
    this._popup.classList.remove("popup_active");
  }

  _handleEscClose(e) {
    if (e.key === ESC_CODE) {
      this.close();
    }
  }

  _handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
        this._popup.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverlayClose)
  }
}
