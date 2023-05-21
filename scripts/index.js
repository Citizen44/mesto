import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";

const popup = document.querySelector(".popup");
// элементы  EditProfile:
const editButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const closeButton = document.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
// элементы addCards:
const addCardsPopup = document.querySelector(".popup_type_add-cards");
const addCardsButton = document.querySelector(".profile__add-button");
// элементы формы:
const formElement = document.querySelector(".form");
const editProfileNameInput = document.querySelector(".form__input_type_name");
const editProfileJobInput = document.querySelector(".form__input_type_job");
const inputImage = document.getElementById("input-image");
const inputTitle = document.getElementById("input-title");
// элементы imagePopup:
export const imagePopup = document.querySelector(".popup_type_zoom-image");
export const photoPopupImage = imagePopup.querySelector(".popup__image");
export const photoPopupText = imagePopup.querySelector(".popup__title_image");

// слушатель editButton:
editButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
  editProfileNameInput.value = profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;
});

// слушатель addCardsButton:
addCardsButton.addEventListener("click", function () {
  openPopup(addCardsPopup);
});

// общая функция открытия:
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// общая функция закрытия:
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

// функция закрытия при нажатии на Esc:
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");

    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// функция закрытия при нажатии на Overlay:
function closePopupByOverlay(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      if (popup) {
        closePopup(popup);
      }
    }
  });
}

//  функция, закрывающая все попапы на странице:
const popupList = Array.from(document.querySelectorAll(".popup"));

popupList.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
  closePopupByOverlay(popup);
});

//  функция, обрабатывающая сохранение данных в форме редактирования профиля:
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileJob.textContent = editProfileJobInput.value;
  closePopup(editProfilePopup);
}

formElement.addEventListener("submit", handleEditProfileSubmit);

//  массив с данными карточек:
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "form__input_type_invalid",
};

//  Создание экземпляров класса FormValidator:
const form = document.forms.form;
const editProfileValidation = new FormValidator(config, form);
editProfileValidation.enableValidation();

const addForm = document.forms.addForm;
const addCardsValidation = new FormValidator(config, addForm);
addCardsValidation.enableValidation();

//  Функция добавления новой карточки:
function addCard(evt) {
  evt.preventDefault();

  const newCardData = {
    name: "",
    link: "",
  };

  newCardData.name = inputTitle.value;
  newCardData.link = inputImage.value;

  const newCard = new Card(newCardData, "card-template");
  const cardElement = newCard.generateCard();
  const cardGrid = document.querySelector(".grid-cards");
  cardGrid.prepend(cardElement);

  const addForm = document.forms.addForm;
  addForm.reset();

  closePopup(addCardsPopup);
}

addForm.addEventListener("submit", addCard);

//  Создание экземпляров класса Card:
initialCards.forEach((item) => {
  const card = new Card(item, "card-template");
  const cardElement = card.generateCard();
  const cardGrid = document.querySelector(".grid-cards");
  cardGrid.append(cardElement);
});