import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callback) {
    super(selectorPopup);
    this._callback = callback;
    this._popupForm = this._popup.querySelector(".form");
    this._inputList = this._popupForm.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}