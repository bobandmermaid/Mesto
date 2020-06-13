class CardList {
  constructor(cardsList, cardsArray) {
    this._cardsList = cardsList;
    this._cardsArray = cardsArray;
  }

  addCard = card => {
    this._cardsList.appendChild(card);
  }

  render = () => {
    this._cardsArray.forEach(item => {
      this.addCard(item);
    });
  }
}