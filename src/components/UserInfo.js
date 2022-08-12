export default class UserInfo {
  constructor({ name, text }) {
    this._name = name;
    this._text = text;
  }
  getUserInfo() {
    return {
        name: this._name.textContent,
        text: this._text.textContent
    }
  }
  setUserInfo(values) {
    this._name.textContent = values.name;
    this._text.textContent = values.text;
  }
}
