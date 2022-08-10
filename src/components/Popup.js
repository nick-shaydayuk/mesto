export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    console.log(this._popupSelector);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_active");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_active");
    this._popup.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverlayClose);
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close()
        
      });
    document.addEventListener("keydown", this._handleEscClose);
  }
}
