import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig, profileEditButton, buttonAddCards, nameInput, jobInput, profileName, profileJob} from "../utils/constants.js";

import "../pages/index.css";

const profileInfo = new UserInfo(".profile__name", ".profile__job");

const profileUserPopup = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
profileUserPopup.setEventListeners();

// слушатель editButton:
profileEditButton.addEventListener("click", () => {
  profileUserPopup.open();
  formEditValidation.resetValidation();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

function handleProfileFormSubmit(data) {
  const dataUserValue = {
    userName: data.name,
    userJob: data.job,
  };
  profileUserPopup.close();
  profileInfo.setUserInfo(dataUserValue);
}

const popupAddingCards = new PopupWithForm(
  ".popup_type_add-cards",
  handleCardFormSubmit
);
popupAddingCards.setEventListeners();

function handleCardFormSubmit(data) {
  const dataCardValue = {
    link: data.image,
    name: data.title,
  };
  cardsSection.addItem(createCard(dataCardValue));
  popupAddingCards.close();
}

// слушатель addCardsButton:
buttonAddCards.addEventListener("click", function () {
  popupAddingCards.open();
  formAddCardsValidation.resetValidation();
});

const imagePopup = new PopupWithImage(".popup_type_zoom-image");
imagePopup.setEventListeners();

function handleCardClick(link, name) {
  imagePopup.openPhoto(link, name);
}

//  Создание экземпляров класса Section:
const cardsSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  ".grid-cards"
);

cardsSection.renderItems();

function createCard(data) {
  const newCard = new Card(data, "card-template", handleCardClick);
  const cardElement = newCard.generateCard();

  return cardElement;
}

//  Создание экземпляров класса FormValidator:
const form = document.forms.form;
const formEditValidation = new FormValidator(validationConfig, form);
formEditValidation.enableValidation();

const formAdd = document.forms.addForm;
const formAddCardsValidation = new FormValidator(validationConfig, formAdd);
formAddCardsValidation.enableValidation();
