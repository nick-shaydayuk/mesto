const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("Произошла ошибка");
};

export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUser()])
  }

  async getUser() {
    const res = await fetch(`${this._url}users/me`, {
      headers: this._headers,
    });
    if (res.ok) {
        return res.json();
      }
      Promise.reject("Произошла ошибка");
  }

  async setUserInfo({name, about}) {
    const res = await fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
    return onError(res);
  }

  async setUserAvatar({avatar}) {
    const res = await fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
    return onError(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._url}cards`, {
      headers: this._headers,
    });
    return onError(res);
  }

  async createCard({name, link}) {
    const res = await fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return onError(res);
  }

  async deleteCard({id}) {
    const res = await fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return onError(res);
  }

  async addLike({id}) {
    const res = await fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return onError(res);
  }
  
  async removeLike({id}) {
    const res = await fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return onError(res);
  }
}
