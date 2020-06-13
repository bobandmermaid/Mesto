class PopupForm extends Popup {
  constructor(popupElement, openButton, closeButton, resetPopup) {
    super(popupElement, closeButton);
    this._openButton = openButton;
    this._resetPopup = resetPopup;
    this.setListeners();
  }

  open = () => {
    this._resetPopup();
    super.open();
  }

  setListeners = () => {
    this
      ._openButton
      .addEventListener('click', this.open);
  }
}