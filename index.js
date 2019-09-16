var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');

const express = require('express');
const Game = require('./game');

//routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

//Open port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

var hand = 0;
var points = 0;
var counter = 0;

io.on('connection', function(socket){

  socket.on('init', function(msg){
    var game = new Game(hand);
    hand = whoIsHand(hand);
    io.emit('init', game.createCardsPerPlayer());

    socket.on('card', function(msg){
      console.log(counter);
      counter = incrementCounter(counter);
//      console.log(counter);
      io.emit('card', msg);
    });
  });

});

function incrementCounter(counter){
  if(counter === 5){
    counter = 0;
  }else{
    counter++;
  }
  return counter;
}

function whoIsHand(hand){
  if(hand === 0){
    return 1;
  }else{
    return 0;
  }
}
