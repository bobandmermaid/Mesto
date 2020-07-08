export default class UserInfo {
  setUserInfo ({ name, about, id }) {
    this._name = name;
    this._about = about;
    this._id = id;
  }

  updateRender (userElement, aboutElement) {
    userElement.textContent = this._name;
    aboutElement.textContent = this._about;
  }

  getUserInfo () {
    return { name: this._name, about: this._about, id: this._id };
  }
}