
class Deck{

  constructor(){
    this.suit = ['Espadas', 'Bastos', 'Oros', 'Copas'];
    this.numbers = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  }

  createCard(){
    var randomSuit = this.suit[Math.floor(Math.random()*this.suit.length)];
    var randomNumber = this.numbers[Math.floor(Math.random()*this.numbers.length)];
    var cardText = randomNumber + ' de ' + randomSuit;
    var numberForEnvido = this.getValueOfEnvidoPerNumber(randomNumber);
    var card = {
      cardText: cardText,
      suit: randomSuit,
      number: randomNumber,
      valueForEnvido: numberForEnvido
    };
    return card;
  }

  getValueOfEnvidoPerNumber(number){
    var valueNumber = number;
    if(number >= 10){
      valueNumber = 20;
    }
    return valueNumber;
  }

}

module.exports = Deck;

