export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity = (inputElement) => {
    if (inputElement.checkValidity()) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  _setEventListeners() {
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonValidity();
      });
    });
  }

  _disableButton() {
    this._buttonElement.setAttribute("disabled", "");
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton() {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  _toggleButtonValidity() {
    if (this._formElement.checkValidity()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  };

  resetValidation() {
    this._disableButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  } 

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonValidity();
  }
}