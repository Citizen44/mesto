let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button')
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formName = document.querySelector('.form__name');
let formJob = document.querySelector('.form__job');

editButton.addEventListener('click', function() {
    popup.className = 'popup_opened';
    formName.setAttribute('value', profileName.textContent);
    formJob.setAttribute('value', profileJob.textContent);
});

closeButton.addEventListener('click', function() {
    formName.setAttribute('value', profileName.textContent);
    formJob.setAttribute('value', profileJob.textContent);
    popup.className = 'popup';
    
});

saveButton.addEventListener('click', function() {
    popup.className = 'popup';
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
};

saveButton.addEventListener('click', handleFormSubmit);