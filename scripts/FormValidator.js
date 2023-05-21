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
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonValidity();
      });
    });
  }

  _disableButton(button) {
    button.setAttribute("disabled", "");
    button.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton(button) {
    button.removeAttribute("disabled");
    button.classList.remove(this._config.inactiveButtonClass);
  }

  _toggleButtonValidity() {
    const submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    if (this._formElement.checkValidity()) {
      this._enableButton(submitButton);
    } else {
      this._disableButton(submitButton);
    }
  };

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this._config.formSelector)
    );
    formList.forEach(() => {
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._disableButton(evt.submitter);
      });
      this._setEventListeners();
      this._toggleButtonValidity();
    });
  }
}