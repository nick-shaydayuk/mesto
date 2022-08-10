export default class UserInfo {
  constructor({ name, text }, { inputName, inputText }) {
    this._name = name;
    this._text = text;
    this._inputName = inputName;
    this._inputText = inputText;
  }
  getUserInfo() {
    this._inputName.value = this._name.textContent;
    this._inputText.value = this._text.textContent;
  }
  setUserInfo() {
    this._name.textContent = this._inputName.value;
    this._text.textContent = this._inputText.value;
  }
}
