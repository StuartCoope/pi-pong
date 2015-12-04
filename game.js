var inputs = require("./inputs.js");
var Player = require("./player.js");
var Sound = require('./sound.js');
var redButton = new inputs.led(7);

var buttonInputs = {
	red : 13,
	green: 11
}
var Game = function(output) {
	var self = this;
	self.output = output;
	self.sound = new Sound();
	self.players = {
		red: new Player('Red', new inputs.button(buttonInputs.red)),
		green: new Player('Green', new inputs.button(buttonInputs.green))
	};

	var redTimeout = null;
	var greenTimeout = null;
	
	self.players.red.button.onDown(function() {
		self.winPoint(self.players.red);
		redTimeout = setTimeout(function(){self.startGame(true);}, 1000);
	});

	self.players.green.button.onDown(function() {
		self.winPoint(self.players.green);
		greenTimeout = setTimeout(function(){self.startGame(true); }, 1000);
	});

	self.players.green.button.onUp(function() {
		clearTimeout(greenTimeout);
	});

	self.players.red.button.onUp(function() {
		clearTimeout(redTimeout);
	})

	self.startGame = function (sound) {
		self.output.print('New Game!');
		if(sound){
			self.sound.playSound('beginGame');
		}
		self.players.red.score = 0;
		self.players.green.score = 0;
	}

	self.winPoint = function(player) {
		player.score += 1;
		var enemy;
		if (player.name == 'Red') {
			enemy = self.players.green;
		} else {
			enemy = self.players.red;
		}
		if (player.score >= 11) {
			if ((player.score - enemy.score) >= 2)
				self.endGame(player);
			else {
				self.sound.playSound('newPoint');
				self.output.print('Red: ' + self.players.red.score + '   Green: ' + self.players.green.score);
				return;
			}
		}
		self.output.print('Red: ' + self.players.red.score + '   Green: ' + self.players.green.score);
		if (player.score > 10) {
			self.endGame(player);
		}
		self.sound.playSound('newPoint');
	}

	self.endGame = function (winningPlayer) {	
		self.output.print(winningPlayer.name + ' has won!');
		self.sound.playSound('winner');

		self.startGame();
	}


};

module.exports = Game;