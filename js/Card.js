class Card {

  constructor(image, name, openImageCallback) {
    this._image = image;
    this._name = name;
    this._openImageCallback = openImageCallback;
  }

  create() {
    this.placeCard = document.createElement('div');
    this.imageElement = document.createElement('div');
    this.iconDeleteButtonElement = document.createElement('button');
    this.descriptionElement = document.createElement('div');
    this.nameElement = document.createElement('h3');
    this.iconLikeButtonElement = document.createElement('button');

    this.placeCard.classList.add('place-card');
    this.imageElement.classList.add('place-card__image');
    this.imageElement.setAttribute('style', 'url');
    this.imageElement.style.backgroundImage = `url(${this._image}`;
    this.imageElement.style.cursor = 'pointer';
    this.iconDeleteButtonElement.classList.add('place-card__delete-icon');
    this.descriptionElement.classList.add('place-card__description');
    this.nameElement.classList.add('place-card__name');
    this.nameElement.textContent = this._name;
    this.iconLikeButtonElement.classList.add('place-card__like-icon');

    this.placeCard.appendChild(this.imageElement);
    this.imageElement.appendChild(this.iconDeleteButtonElement);
    this.placeCard.appendChild(this.descriptionElement);
    this.descriptionElement.appendChild(this.nameElement);
    this.descriptionElement.appendChild(this.iconLikeButtonElement);

    this.setListeners();
    return this.placeCard;
  }

  like = event => {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove = () => {
    this.removeListeners();
    this.placeCard.remove();
  }

  openImg = () => {
    this._openImageCallback(this._image);
  }

  setListeners() {
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

  removeListeners() {
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