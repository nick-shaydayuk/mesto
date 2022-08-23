export default class UserInfo {
  constructor({ name, text, avatar }) {
    this._name = name;
    this._text = text;
    this._avatar = avatar;
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      text: this._text.textContent,
      avatar: this._avatar.src,
    };
  }
  setUserInfo(values) {
    this._name.textContent = values.name;
    this._text.textContent = values.text;
    
  }
  setAvatar(values) {
    this._avatar.src = values.avatar;
  }
}
