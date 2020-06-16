class UserInfo {

  setUserInfo = ({ name, about }) => {
    this._name = name;
    this._about = about;
  }

  updateRender = (userElement, aboutElement) => {
    userElement.textContent = this._name;
    aboutElement.textContent = this._about;
  }

  getUserInfo = () => {
    return { name: this._name, about: this._about };
  }
}

