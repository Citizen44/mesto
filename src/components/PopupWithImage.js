import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._photoPopupImage = this._popup.querySelector(".popup__image");
    this._photoPopupText = this._popup.querySelector(".popup__title_image");
  }

  open(link, name) {
    super.open();
    this._photoPopupImage.src = link;
    this._photoPopupImage.alt = name;
    this._photoPopupText.textContent = name;
    
  }
}