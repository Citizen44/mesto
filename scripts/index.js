// элементы  EditProfile:
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit-profile');
const closeEditProfilePopupButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// элементы addCards:
const addCardsPopup = document.querySelector('.popup_type_add-cards');
const addCardsButton = document.querySelector('.profile__add-button');
// элементы формы:
const form = document.querySelector('.form')
const formName = document.querySelector('.form__input_type_name');
const formJob = document.querySelector('.form__input_type_job');

// слушатель editButton:
editButton.addEventListener('click', function() {
    openPopup(popup);
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
});

// слушатель addCardsButton:
addCardsButton.addEventListener('click', function() {
  openPopup(addCardsPopup);
});

// общая функция открытия:
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// общая функция закрытия:
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//  функция, закрывающая все попапы на странице:
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => {
  const closeEditProfilePopupButton = popup.querySelector('.popup__close-button');
  closeEditProfilePopupButton.addEventListener('click', function() {
    closePopup(popup);
  })
});

//  функция, обрабатывающая сохранение данных в форме редактирования профиля:
function handleEditProfileSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    closePopup(popup);
};
form.addEventListener('submit', handleEditProfileSubmit);

//  массив с данными карточек:
let initialCards = [
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

      let newCard = {
        name: '',
        link: ''
      };

      newCard.name = inputTitle.value;
      newCard.link = inputImage.value ; 
    
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
    const photoPopupimage = imagePopup.querySelector('.popup__image');
    const photoPopuptext = imagePopup.querySelector('.popup__title_image');

    const openPhotoPopup = (cardData) => {
    openPopup(imagePopup);

    photoPopupimage.src = cardData.link;
    photoPopupimage.alt = cardData.name;
    photoPopuptext.textContent = cardData.name;
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