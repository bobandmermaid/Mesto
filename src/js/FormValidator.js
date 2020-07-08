export default class FormValidator {
  constructor(someForm, errorMessages) {
    this._someForm = someForm;
    this._errorMessages = errorMessages;
    this.handlerInputForm = this.handlerInputForm.bind(this);
    this.setListeners();
  }

  isValidate (inputElement) {  // Проверка полей на ошибки
    inputElement.setCustomValidity('');
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(this._errorMessages.valueMissing);
      return false
    } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      inputElement.setCustomValidity(this._errorMessages.tooShort);
      return false
    } else if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
      inputElement.setCustomValidity(this._errorMessages.typeMismatch);
      return false
    }

    return inputElement.checkValidity();
  }

  inputErrorAdd (inputElement) {  // Присваиваем ошибку
    this.errorMessage = this._someForm.querySelector(`#${inputElement.id}-error`);
    this.errorMessage.textContent = inputElement.validationMessage;
  }

  isFieldValid (inputElement) {  // Записывает и возвращает ошибку
    const valid = this.isValidate(inputElement);
    this.inputErrorAdd(inputElement);
    return valid;
  }

  setSubmitButtonState (stateElement) {  // Включает/выключает кнопку
    if (stateElement) {
      this.button.removeAttribute('disabled');
      this.button.classList.add(`popup__button_valid`);
    } else {
      this.button.setAttribute('disabled', 'true');
      this.button.classList.remove(`popup__button_valid`);
    }
  }

  handlerInputForm (event) {  // Cлушатель на инпут
    this.isFieldValid(event.target);
    if (this._someForm.checkValidity()) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false);
    }
  }

  resetErrorsPopup () {
    this.errors.forEach((errorElement) =>
      errorElement.textContent = '');
  }

  setListeners () {
    this.errors = this._someForm.querySelectorAll('.error');
    this.button = this._someForm.querySelector('.button');
    this._someForm.addEventListener('input', this.handlerInputForm);
  }
}