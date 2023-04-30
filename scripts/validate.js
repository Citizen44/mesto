//Валидация

  function showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  function hideInputError(config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };
  
  function checkInputValidity(config, formElement, inputElement) {
    if (inputElement.checkValidity()) {
      hideInputError(config, formElement, inputElement);
    } else {
      showInputError(config, formElement, inputElement, inputElement.validationMessage);
    }
  };
  
  function disableButton (config, button) {
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass);
  };
  
  function enableButton (config, button) {
    button.removeAttribute('disabled');
    button.classList.remove(config.inactiveButtonClass);
  };
  
  function toggleButtonValidity(config, formElement) {
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    
    if (formElement.checkValidity()) {
        enableButton(config, submitButton);
    } else {
        disableButton(config, submitButton);
    }
  };
  
  const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(config, formElement, inputElement);
        toggleButtonValidity(config, formElement);
      });
    });
  };
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        disableButton(config, evt.submitter);
      });
      setEventListeners(config, formElement);
      toggleButtonValidity(config, formElement);
    });
  };
  
  const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'form__input_type_invalid'
  };

  enableValidation(config);