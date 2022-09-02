import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitHandler = submitHandler;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._buttonElement = this._popup.querySelector(".popup__submit-button");
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => values[input.name] = input.value);
    return values;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues(), this._buttonElement);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
