let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let addPopup = document.getElementById('add-popup');
let closeButton = document.querySelector('.popup__close-button');
let form = document.querySelector('.form')
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formName = document.querySelector('.form__input_type_name');
let formJob = document.querySelector('.form__input_type_job');
let addButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', function() {
    openPopup(popup);
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
});

addButton.addEventListener('click', function() {
  openPopup(addPopup);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', function() {
    closePopup(popup);
  })
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    closePopup(popup);
};

form.addEventListener('submit', handleFormSubmit);


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
    
      renderCardElement(createCardElement(newCard));
      closePopup(addPopup);
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

    const imagePopup = document.getElementById('image-popup')
    const openPhotoPopup = (cardData) => {
    openPopup(imagePopup);
    let photoPopupimage = imagePopup.querySelector('.popup__image');
    let photoPopuptext = imagePopup.querySelector('.popup__title_image');
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
    cardGrid.prepend(cardElement);
  };

  initialCards.forEach((card) => {
    const element = createCardElement(card);
    renderCardElement(element);
  });