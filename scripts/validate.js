//Валидация

  function showInputError(config, editProfileForm, inputElement, errorMessage) {
    const errorElement = editProfileForm.querySelector(`#${inputElement.id}-error`);
  
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  function hideInputError(config, editProfileForm, inputElement) {
    const errorElement = editProfileForm.querySelector(`#${inputElement.id}-error`);
  
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };
  
  function checkInputValidity(config, editProfileForm, inputElement) {
    if (inputElement.checkValidity()) {
      hideInputError(config, editProfileForm, inputElement);
    } else {
      showInputError(config, editProfileForm, inputElement, inputElement.validationMessage);
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
  
  function toggleButtonValidity(config, editProfileForm) {
    const submitButton = editProfileForm.querySelector(config.submitButtonSelector);
    
    if (editProfileForm.checkValidity()) {
        enableButton(config, submitButton);
    } else {
        disableButton(config, submitButton);
    }
  };
  
  const setEventListeners = (config, editProfileForm) => {
    const inputList = Array.from(editProfileForm.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(config, editProfileForm, inputElement);
        toggleButtonValidity(config, editProfileForm);
      });
    });
  };
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((editProfileForm) => {
      editProfileForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        toggleButtonValidity(config, editProfileForm);
      });
      setEventListeners(config, editProfileForm);
      toggleButtonValidity(config, editProfileForm);
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