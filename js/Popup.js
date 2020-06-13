class Popup {
  constructor(popupElement, closeButton) {
    this._popupElement = popupElement;
    this._closeButton = closeButton;
    this.close = this.close.bind(this);
    this.setListeners();
  }

  open() {
    this._popupElement.classList.add('popup_is-opened');
  }

  close() {
    this._popupElement.classList.remove('popup_is-opened');
  }

  setListeners() {
    this
      ._closeButton
      .addEventListener('click', this.close);
  }
}
