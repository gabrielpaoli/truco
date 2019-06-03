var _ = require('underscore');
const Deck = require('./deck');
const Player = require('./player');

class Game{

  constructor(hand) {
    this.hand = hand;
    this.deck = new Deck;
    this.playerNames = ['Gabriel', 'Fulano'];
    this.qtyPlayers = 2;
    this.qtyCardsPerPlayer = 3;
  }

  qtyOfCardsInTable(){
    return this.qtyPlayers * this.qtyCardsPerPlayer;
  }

  createHandCards() {
    var tableCards = [];
    var i;
    for (i = 0; i < this.qtyOfCardsInTable(); i++) {
      tableCards.push(this.existCardInTable(this.deck.createCard(), tableCards));
    }
    return tableCards;
  }

  existCardInTable(card, tableCards) {
    var i;
    for (i = 0; i < tableCards.length; i++) {
      if(tableCards[i].cardText === card.cardText){
        var newCard = this.deck.createCard();
        return this.existCardInTable(newCard, tableCards);
      }
    }
    return card;
  }

  createCardsPerPlayer(){
    var handCards = this.createHandCards();
    var playersCards = _.chunk(handCards, this.qtyCardsPerPlayer);
    var extra = this.getEnvido(playersCards);
    var player1 = new Player(this.playerNames[0], playersCards[0], extra[0]);
    var player2 = new Player(this.playerNames[1], playersCards[1], extra[1]);
    var playersCardsF = [player1, player2];
    return playersCardsF;
  }

  lessOrAddExcedentToEnvido(points){
    if(points > 38 && points <= 47){
      points = points - 20;
    }else if(points > 47){
      points = points - 40;
    }else if(points <= 13){
      points = points + 20;
    }
    return points;
  }

  getBiggestNumber(numbers){
    var i;
    var elements = [];
    for (i = 0; i < numbers.length; i++) {
      if(numbers[i] < 10){
        elements.push(numbers[i]);
      }
    }
    if(elements.length === 0){
      return 0;
    }else{
      return Math.max.apply(null, elements);
    }
  }

  getEnvido(playersCards){
    var i;
    var flor = false;
    var envido = false;
    var extra = [];
    var hand;
    for (i = 0; i < playersCards.length; i++) {
      if(playersCards[i][0].suit === playersCards[i][1].suit && playersCards[i][0].suit === playersCards[i][2].suit){
        envido = true; //TODO: Add envido with max value;
        flor = this.lessOrAddExcedentToEnvido(playersCards[i][0].valueForEnvido + playersCards[i][1].valueForEnvido + playersCards[i][2].valueForEnvido);
      }else if(playersCards[i][0].suit === playersCards[i][1].suit){
        flor = false;
        envido = this.lessOrAddExcedentToEnvido(playersCards[i][0].valueForEnvido + playersCards[i][1].valueForEnvido);
      }else if(playersCards[i][0].suit === playersCards[i][2].suit){
        flor = false;
        envido = this.lessOrAddExcedentToEnvido(playersCards[i][0].valueForEnvido + playersCards[i][2].valueForEnvido);
      }else if(playersCards[i][1].suit === playersCards[i][2].suit){
        flor = false;
        envido = this.lessOrAddExcedentToEnvido(playersCards[i][1].valueForEnvido + playersCards[i][2].valueForEnvido);
      }else{
        flor = false;
        envido = this.getBiggestNumber([playersCards[i][0].number, playersCards[i][1].number, playersCards[i][2].number]);
      }

      hand = this.isHand(this.hand, i);

      extra.push({
        envido: envido,
        flor: flor,
        hand: hand
      });
    }
    return extra;
  }

  isHand(hand, i){
    if(hand === 0){
      if(i === 0){
        hand = true;
      }else{
        hand = false;
      }
    }else if(hand ===1){
      if(i === 1){
        hand = true;
      }else{
        hand = false;
      }
    }
    return hand;
  }



}

module.exports = Game;

