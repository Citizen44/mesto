import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../components/constants.js";
import { config } from "../components/constants.js";

import '../pages/index.css';

const profileEditButton = document.querySelector(".profile__edit-button");
const buttonAddCards = document.querySelector(".profile__add-button");

const profileInfo = new UserInfo(".profile__name", ".profile__job");

const profileUserPopup = new PopupWithForm(".popup_type_edit-profile", handleprofileUserPopup);
profileUserPopup.setEventListeners();

// слушатель editButton:
profileEditButton.addEventListener("click", () => {
  profileUserPopup.open();
  formEditValidation.resetValidation();
});

function handleprofileUserPopup(data) {
  const dataUserValue = {
    userName: data.name,
    userJob: data.job,
  };
  profileInfo.setUserInfo(dataUserValue);
}

const popupAddingCards = new PopupWithForm(".popup_type_add-cards", handlepopupAddingCards);
popupAddingCards.setEventListeners();

function handlepopupAddingCards(data) {
  const dataCardValue = {
    link: data.image,
    name: data.title,
  };
  createCard(dataCardValue);
};

// слушатель addCardsButton:
buttonAddCards.addEventListener("click", function () {
  popupAddingCards.open();
  FormAddCardsValidation.resetValidation();
});

const imagePopup = new PopupWithImage(".popup_type_zoom-image");
imagePopup.setEventListeners();

function handleCardClick() {
  imagePopup.open(this._link, this._name);
}

//  Создание экземпляров класса Section:
const defaultCardList = new Section(
  { 
    data: initialCards,
    renderer: (item) => {
      createCard(item);
    } 
  }, ".grid-cards");

defaultCardList.renderItems();

function createCard(data) {
  const newCard = new Card(data, "card-template", handleCardClick);
  const cardElement = newCard.generateCard();
  defaultCardList.addItem(cardElement);
}

//  Создание экземпляров класса FormValidator:
const form = document.forms.form;
const formEditValidation = new FormValidator(config, form);
formEditValidation.enableValidation();

const formAdd = document.forms.addForm;
const FormAddCardsValidation = new FormValidator(config, formAdd);
FormAddCardsValidation.enableValidation();