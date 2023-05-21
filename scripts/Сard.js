import {openPopup, imagePopup, photoPopupImage, photoPopupText} from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .getElementById(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteButtonClick();
  });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openPhotoPopup();
    })
  }

  _handleLikeButtonClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _openPhotoPopup() {
    openPopup(imagePopup);

    photoPopupText.textContent = this._name;
    photoPopupImage.src = this._link;
    photoPopupImage.alt = this._name;
  }
};