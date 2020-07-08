import Popup from "./Popup";

export default class PopupForm extends Popup {
  constructor(popupElement, openButton, closeButton, clearPopup) {
    super(popupElement, closeButton);
    this._openButton = openButton;
    this._clearPopup = clearPopup;
    this.setListeners = this.setListeners.bind(this);
  }

  open () {
    this._clearPopup();
    super.open();
  }

  close () {
    super.close();
  }

  setListeners () {
    this
      ._openButton
      .addEventListener('click', this.open);
    this
      ._closeButton
      .addEventListener('click', this.close);
  }
}