let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let form = document.querySelector('.form')
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formName = document.querySelector('.form__input_type_name');
let formJob = document.querySelector('.form__input_type_job');

editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
});

function popupClose() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    popupClose();
};

form.addEventListener('submit', handleFormSubmit);