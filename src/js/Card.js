export default class Card {

  constructor(data, ownerId, openImageCallback, removeCard, likeState) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this.likes = data.likes;
    this.owner = data.owner;
    this.ownerId = ownerId;
    this._openImageCallback = openImageCallback;
    this._removeCard = removeCard;
    this._likeState = likeState;
  }

  create () {
    this.placeCard = document.createElement('div');
    this.imageElement = document.createElement('div');
    this.iconDeleteButtonElement = document.createElement('button');
    this.descriptionElement = document.createElement('div');
    this.nameElement = document.createElement('h3');
    this.iconLikeButtonElement = document.createElement('button');
    this.likeContainerElement = document.createElement('div');
    this.likeCounterElement = document.createElement('div');

    this.placeCard.classList.add('place-card');
    this.imageElement.classList.add('place-card__image');
    this.imageElement.setAttribute('style', 'url');
    this.imageElement.style.backgroundImage = `url(${this._link}`;
    this.imageElement.style.cursor = 'pointer';
    this.iconDeleteButtonElement.classList.add('place-card__delete-icon');
    this.descriptionElement.classList.add('place-card__description');
    this.nameElement.classList.add('place-card__name');
    this.nameElement.textContent = this._name;
    this.likeContainerElement.classList.add('place-card__like-container');
    this.iconLikeButtonElement.classList.add('place-card__like-icon');
    this.likeCounterElement.classList.add('place-card__like-counter');
    this.likeCounterElement.textContent = this.likes.length;

    this.placeCard.append(this.imageElement);
    this.imageElement.append(this.iconDeleteButtonElement);
    this.placeCard.append(this.descriptionElement);
    this.descriptionElement.append(this.nameElement);
    this.descriptionElement.append(this.likeContainerElement);
    this.likeContainerElement.append(this.iconLikeButtonElement);
    this.likeContainerElement.append(this.likeCounterElement);

    this.isLiked();
    this.setDeleteButton();
    this.setListeners();
    return this.placeCard;
  }

  like = () => {
    if (this.iconLikeButtonElement.classList.contains('place-card__like-icon_liked')) {
      this._likeState(false, this._id)
        .then(res => {
          this.likeCounterElement.textContent = res.likes.length;
          this.iconLikeButtonElement.classList.remove('place-card__like-icon_liked');
        })
        .catch(err => {
          alert(err);
        });
    } else {
      this._likeState(true, this._id)
        .then(res => {
          this.likeCounterElement.textContent = res.likes.length;
          this.iconLikeButtonElement.classList.add('place-card__like-icon_liked');
        })
        .catch(err => {
          alert(err);
        });
    }
  }

  isLiked = () => {
    if (this.likes.some(elem => elem._id === this.ownerId)) {
      this.iconLikeButtonElement.classList.add('place-card__like-icon_liked');
    }
  }

  setDeleteButton = () => {
    if (this.owner._id === this.ownerId) {
      this.iconDeleteButtonElement.style.display = 'block';
    }
  }

  openImg = () => {
    this._openImageCallback(this._link);
  }

  remove = () => {
    if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
      this._removeCard(this._id);
      this.removeListeners();
      this.placeCard.remove();
    }
  }

  setListeners () {
    this
      .iconLikeButtonElement
      .addEventListener('click', this.like);
    this
      .iconDeleteButtonElement
      .addEventListener('click', this.remove);
    this
      .imageElement
      .addEventListener('click', this.openImg);
  }

  removeListeners () {
    this
      .iconLikeButtonElement
      .removeEventListener('click', this.like);
    this
      .iconDeleteButtonElement
      .removeEventListener('click', this.remove);
    this
      .imageElement
      .removeEventListener('click', this.openImg);
  }
}