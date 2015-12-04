

var Player = function (playerNumber, score) {
    this.playerNumber = playerNumber;
    this.score = score;
};


var Game = function (player1, player2, turn) {
    this.turn = turn;
    this.player1 = player1;
    this.player2 = player2;
};

Game.prototype.increaseScore = function(playerNumber) {
    var playerInc;
    switch(playerNumber) {
        case player1.playerNumber:
            playerInc = player1;
            break;
        case player2.playerNumber:
            playerInc = player2;
            break;
    }
    playerInc.score += 1;
    if(playerInc.score > 10) {
        this.endGame(playerInc);
    }
};

Game.prototype.endGame = function(player) {
    this.player1.score = 0;
    this.player2.score = 0;
    output('Player' + player.playerNumber + ' has won!');
}

var gamePlaying;

var output = function output(text) {
    //do shit
};

function startGame(turn)
{
    output('Fight!');
    gamePlaying = new Game(
      new Player(1,0),
      new Player(2,0),
      turn
    );
}



var gpio = require("pi-gpio");
var button1 = 7;
var button2 = 11;

gpio.open(button1, "input", function() {
    if (!gamePlaying) {
        startGame(1);gamePlaying.increaseScore();
        console.log('Game Started');
    } else {
        gamePlaying.player1.increaseScore();
    }
});

gpio.open(button2, "input", function() {
    if (!gamePlaying) {
        startGame(2);
        console.log('Game Started');
    } else {
        gamePlaying.player2.increaseScore();
    }
});


