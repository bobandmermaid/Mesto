class PopupForm extends Popup {
  constructor(popupElement, openButton, closeButton, clearPopup) {
    super(popupElement, closeButton);
    this._openButton = openButton;
    this._clearPopup = clearPopup;
    this.setListeners();
  }

  open = () => {
    this._clearPopup();
    super.open();
  }

  setListeners = () => {
    this
      ._openButton
      .addEventListener('click', this.open);
  }
}