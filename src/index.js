import './pages/index.css'
import Api from "./js/Api"
import Card from "./js/Card"
import CardList from "./js/CardList"
import FormValidator from "./js/FormValidator"
import Popup from "./js/Popup"
import PopupForm from "./js/PopupForm"
import UserInfo from "./js/UserInfo"

(function () {

const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
};

const rootContainer = document.querySelector('.root');
const placesList = rootContainer.querySelector('.places-list');

const userNameElement = rootContainer.querySelector('.user-info__name');
const userAboutElement = rootContainer.querySelector('.user-info__job');
const openEditButton = rootContainer.querySelector('.user-info__edit');
const closeEditButton = rootContainer.querySelector('.popup__close_type_profile');
const editForm = rootContainer.querySelector('.popup_type_profile');
const userFace = rootContainer.querySelector('.user-info__photo');
const formInfoEdit = rootContainer.querySelector('#edit');
const inputUser = rootContainer.querySelector('.popup__input_type_user');
const inputAbout = rootContainer.querySelector('.popup__input_type_about');

const openCardButton = rootContainer.querySelector('.user-info__button');
const closeCardButton = rootContainer.querySelector('.popup__close_type_card');
const cardForm = rootContainer.querySelector('.popup_type_card');
const formAddNewCard = rootContainer.querySelector('#new');
const cardsArray = [];

const closeImageButton = rootContainer.querySelector('.popup__close_type_image');
const imagePopup = rootContainer.querySelector('.popup_type_image');
const imagePopupZoomPicture = rootContainer.querySelector('.popup__image');

const cardList = new CardList(placesList, cardsArray);
const editPopup = new PopupForm(editForm, openEditButton, closeEditButton, clearPopup);
const cardPopup = new PopupForm(cardForm, openCardButton, closeCardButton, clearPopup);
const popupPicture = new Popup(imagePopup, closeImageButton);
const formValidCardAdd = new FormValidator(formAddNewCard, errorMessages);
const formValidEdit = new FormValidator(formInfoEdit, errorMessages);
const userInfo = new UserInfo();

const API_URL =
  NODE_ENV === 'production'
    ? 'https://praktikum.tk/cohort11'
    : 'http://praktikum.tk/cohort11';

const config = {
  baseUrl: API_URL,
  headers: {
    authorization: '3d586cb3-b972-4364-9e4e-d3f459cab5c9',
    'Content-Type': 'application/json'
  }
};

const api = new Api(config);

function openImageCallback(url) {
  imagePopupZoomPicture.src = url;
  popupPicture.open();
}

function likeState(liked, id) {
  if (liked) {
    return api.setLikeCard(id);
  } else {
    return api.unLikeCard(id);
  }
}

function removeCard(id) {
  api.removeCard(id)
    .catch(err => {
      console.log(err);
    });
}

function iteratingArray(arr) {
  arr.forEach(function (item) {
    const card = new Card(item, userInfo._id, openImageCallback, removeCard, likeState);
    const newCard = card.create();
    cardsArray.push(newCard);
  });
}

// Чистка полей форм
function formReset(item) {
  item.reset();
}

// Чистка ошибок форм
function clearPopup() {
  formValidCardAdd.resetErrorsPopup();
  formValidEdit.resetErrorsPopup();

  formValidCardAdd.setSubmitButtonState(false);
}

api.getInitialCards()
  .then(res => {
   cardList.render(iteratingArray(res));
  })
  .catch(err => {
     console.log(err);
  });

api.getUsersInfo()
  .then(data => {
    userInfo.setUserInfo({name: data.name, about: data.about, id: data._id});
    userInfo.updateRender(userNameElement, userAboutElement);
    userFace.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch(err => {
      console.log(err);
  });

// Добавление новой карточки
function sendFormAdd(event) {
  event.preventDefault();

  const link = formAddNewCard.elements.link;
  const name = formAddNewCard.elements.name;

  formValidCardAdd.setSubmitButtonState(false);
  api.addCardPage(name, link)
    .then(elem => {
      const card = new Card(elem, userInfo._id, openImageCallback, removeCard, likeState);
      cardList.addCard(card.create());
      formReset(formAddNewCard);
      cardPopup.close();
    })
    .catch(err => {
      alert(err);
    })
    .finally(() => {
      formValidCardAdd.setSubmitButtonState(true);
    })
}

function sendFormEdit(event) {
  event.preventDefault();

  const name = inputUser.value;
  const about = inputAbout.value;

  api.updateUserInfo(name, about)
    .then((data) => {
      userInfo.setUserInfo({name: data.name, about: data.about});
      userInfo.updateRender(userNameElement, userAboutElement);
      editPopup.close();
    })
    .catch(err => {
      alert(err);
    });
}

// Добавление данных пользователя в поля формы
function inputPopupEditAdd() {

  const getUserAbout = userInfo.getUserInfo();
  inputUser.value = getUserAbout.name;
  inputAbout.value = getUserAbout.about;

  formValidEdit.setSubmitButtonState(true);
}

closeCardButton.addEventListener('click', () => {
  formReset(formAddNewCard);
});
openEditButton.addEventListener('click', inputPopupEditAdd);
formAddNewCard.addEventListener('submit', sendFormAdd);
formInfoEdit.addEventListener('submit', sendFormEdit);

})();