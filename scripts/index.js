// элементы  EditProfile:
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const closeEditProfilePopupButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// элементы addCards:
const addCardsPopup = document.querySelector('.popup_type_add-cards');
const addCardsButton = document.querySelector('.profile__add-button');
// элементы формы:
const editProfileForm = document.querySelector('.form')
const editProfileNameInput = document.querySelector('.form__input_type_name');
const editProfileJobInput = document.querySelector('.form__input_type_job');

// слушатель editButton:
editButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
  editProfileNameInput.value = profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'form__input_type_invalid'
  });
});

// слушатель addCardsButton:
addCardsButton.addEventListener('click', function() {
  openPopup(addCardsPopup);
  
  const addForm = document.forms.addForm;
  addForm.reset();
});

// общая функция открытия:
function openPopup(editProfilePopup) {
  editProfilePopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

// общая функция закрытия:
function closePopup(editProfilePopup) {
  editProfilePopup.classList.remove('popup_opened');
};

// функция закрытия при нажатии на Esc:
function closePopupByEsc (evt) {
  const openedPopup = document.querySelector('.popup_opened');

  if (evt.key === 'Escape') {
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// функция закрытия при нажатии на Overlay:
function closePopupByOverlay (openedPopup) {
  openedPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      if (openedPopup) {
        closePopup(openedPopup);
      };
    };
  });
};

// закрываем все попапы на странице c Esc и Overlay:
const popups = document.querySelectorAll('.popup');
popups.forEach((openedPopup) => {
  closePopupByEsc(openedPopup);
  closePopupByOverlay(openedPopup);
});

//  функция, закрывающая все попапы на странице:
const popupList = Array.from(document.querySelectorAll('.popup'));

popupList.forEach((editProfilePopup) => {
  const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');
  closeEditProfilePopupButton.addEventListener('click', function() {
    closePopup(editProfilePopup);
  });
});

//  функция, обрабатывающая сохранение данных в форме редактирования профиля:
function handleEditProfileSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = editProfileNameInput.value;
    profileJob.textContent = editProfileJobInput.value;
    closePopup(editProfilePopup);
};

editProfileForm.addEventListener('submit', handleEditProfileSubmit);

//  массив с данными карточек:
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  //  функция добавления карточки:
function addCard (evt) {
  evt.preventDefault();
  const inputImage = document.getElementById('input-image');
  const inputTitle = document.getElementById('input-title');
  const newCard = {
    name: '',
    link: ''
  };

  newCard.name = inputTitle.value;
  newCard.link = inputImage.value;
    
  const renderNewCardElement = (cardElement) => {
    cardGrid.prepend(cardElement);
  };

   renderNewCardElement(createCardElement(newCard));
   closePopup(addCardsPopup);
};

addForm.addEventListener('submit', addCard);

const cardTemplate = document.getElementById('card-template');
const cardGrid = document.querySelector('.grid-cards')

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.innerHTML = cardData.name;

    // элементы imagePopup:
  const imagePopup = document.querySelector('.popup_type_zoom-image');
  const photoPopupImage = imagePopup.querySelector('.popup__image');
  const photoPopupText = imagePopup.querySelector('.popup__title_image');

  const openPhotoPopup = (cardData) => {
    openPopup(imagePopup);

    photoPopupImage.src = cardData.link;
    photoPopupImage.alt = cardData.name;
    photoPopupText.textContent = cardData.name;
  };

  imageElement.addEventListener('click', function() {
    openPhotoPopup(cardData);
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  function handleDelete() {
    cardElement.remove();
  };

  function handleLike() {
    likeButton.classList.toggle('card__like-button_active');
  };

  likeButton.addEventListener('click', handleLike);

  deleteButton.addEventListener('click', handleDelete);

  return cardElement;
};

const renderCardElement = (cardElement) => {
  cardGrid.append(cardElement);
};

initialCards.forEach((card) => {
  const element = createCardElement(card);
  renderCardElement(element);
});