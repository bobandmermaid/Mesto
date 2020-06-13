class UserInfo {

  setUserInfo = ({ user, about }) => {
    this._user = user;
    this._about = about;
  }

  updateRender = (userElement, aboutElement) => {
    userElement.textContent = this._user;
    aboutElement.textContent = this._about;
  }

  getUserInfo = () => {
    return { user: this._user, about: this._about };
  }
}

