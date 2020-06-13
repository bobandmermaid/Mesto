(function () {

  const errorMessages = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должна быть ссылка'
  };

  const rootContainer = document.querySelector('.root');
  const placesList = rootContainer.querySelector('.places-list');
  const form = rootContainer.querySelector('.popup__form');

  const userNameElement = rootContainer.querySelector('.user-info__name');
  const userAboutElement = rootContainer.querySelector('.user-info__job');
  const openEditButton = rootContainer.querySelector('.user-info__edit');
  const closeEditButton = rootContainer.querySelector('.popup__close_type_profile');
  const editForm = rootContainer.querySelector('.popup_type_profile');
  const formInfoEdit = rootContainer.querySelector('#edit');

  const openCardButton = rootContainer.querySelector('.user-info__button');
  const closeCardButton = rootContainer.querySelector('.popup__close_type_card');
  const cardForm = rootContainer.querySelector('.popup_type_card')
  const formAddNewCard = rootContainer.querySelector('#new');

  const closeImageButton = rootContainer.querySelector('.popup__close_type_image');
  const imagePopup = rootContainer.querySelector('.popup_type_image');
  const imagePopupZoomPicture = document.querySelector('.popup__image')

  const link = formAddNewCard.elements.link;
  const name = formAddNewCard.elements.name;

  const editPopup = new PopupForm(editForm, openEditButton, closeEditButton, resetPopup);
  const cardPopup = new PopupForm(cardForm, openCardButton, closeCardButton, resetPopup);
  const popupPicture = new Popup(imagePopup, closeImageButton);
  const formValidCardAdd = new FormValidator(formAddNewCard, errorMessages);
  const formValidEdit = new FormValidator(formInfoEdit, errorMessages);
  const userInfo = new UserInfo();

  // Массив карточек на страницу
  const cardsArray = [];
  function iteratingArray(arr) {
    arr.forEach(function (item) {
      const card = new Card(item.link, item.name, addImg);
      const newCard = card.create();
      cardsArray.push(newCard);
    });
  }
  iteratingArray(initialCards);

  const cardList = new CardList(placesList, cardsArray);
  cardList.render();

  function addImg(url) {
    imagePopupZoomPicture.src = url;
    popupPicture.open();
  }

  // Чистка ошибок и полей форм
  function resetPopup() {
    form.reset();
    formValidCardAdd.resetErrorsPopup();
    formValidEdit.resetErrorsPopup();

    formValidCardAdd.setSubmitButtonState(false);
  }

  // Добавление новой карточки
  function sendFormAdd(event) {
    event.preventDefault();

    const card = new Card(link.value, name.value, addImg);
    cardList.addCard(card.create());

    cardPopup.close();
    formValidCardAdd.setSubmitButtonState(false);
  }

  function sendFormEdit(event) {
    event.preventDefault();

    const user = formInfoEdit.elements.user.value;
    const about = formInfoEdit.elements.about.value;
    userInfo.setUserInfo({ user, about });
    userInfo.updateRender(userNameElement, userAboutElement);

    editPopup.close();
  }

  // Добавление данных пользователя в поля формы
  function inputPopupEditAdd() {

    const getUserAbout = userInfo.getUserInfo();
    formInfoEdit.elements.user.value = getUserAbout.user;
    formInfoEdit.elements.about.value = getUserAbout.about;

    formValidEdit.setSubmitButtonState(true);
  }

  userInfo.setUserInfo({ user: 'Jaques Causteau', about: 'Sailor, Researcher' });
  userInfo.updateRender(userNameElement, userAboutElement);

  openEditButton.addEventListener('click', inputPopupEditAdd);
  formAddNewCard.addEventListener('submit', sendFormAdd);
  formInfoEdit.addEventListener('submit', sendFormEdit);
})();

// Добрый день!

// Хорошая и акууратная работа!

// ## Итог
// - Использованы ES6-классы.
// - В классах напрямую не создаются экземпляры других классов.
// - Каждый класс выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится в классе.
// - Делегирование больше не используется. Обработчики добавлены именно тем элементам, события которых нужно отслеживать.
// - Ненужные обработчики удаляются.
// - Каждый класс описан в отдельном JS-файле.

// Работа принята

// Можно лучше
// Большое количество параметров лучше передвать в метод или в конструктор используя деструктуризацию.

// Например в коде:
// ~~~
// const newClass = new Class({ windowOne, userForm, popupObj })
// ~~~
// А внутри класса:
// ~~~
// constructor ({ userForm, popupObj, windowOne }) {...}
// ~~~
// И тогда порядок переменных будет неважен, это удобно

// Можно лучше
// Воспользуйтесь `<template>` -- https://developer.mozilla.org/ru/docs/Web/HTML/Element/template
// И `cloneNode` -- https://developer.mozilla.org/ru/docs/Web/API/Node/cloneNode
// для удобного тиражирования одинаковых объектов