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
    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteButtonClick();
  });

    this._cardImage.addEventListener('click', () => {
      this._openPhotoPopup();
    })
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _openPhotoPopup() {
    openPopup(imagePopup);

    photoPopupText.textContent = this._name;
    photoPopupImage.src = this._link;
    photoPopupImage.alt = this._name;
  }
};