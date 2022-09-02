export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUser()])
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  };

  async getUser() { // в задании вроде не сказано, что я должен строго по примеру запросы писать..
    const res = await fetch(`${this._url}users/me`, {
      headers: this._headers,
    });
    return this._checkResponse(res);
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
    return this._checkResponse(res);
  }

  async setUserAvatar({avatar}) {
    const res = await fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
    return this._checkResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._url}cards`, {
      headers: this._headers,
    });
    return this._checkResponse(res);
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
    return this._checkResponse(res);
  }

  async deleteCard({id}) {
    const res = await fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async addLike({id}) {
    const res = await fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
  
  async removeLike({id}) {
    const res = await fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
}
