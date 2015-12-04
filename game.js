var inputs = require("./inputs.js");
var Player = require("./player.js");
var Sound = require('./sound.js');
var redButton = new inputs.led(7);

var buttonInputs = {
	red : 9,
	green: 10
}
var Game = function(output) {
	this.output = output;
	this.sound = new Sound();
	this.players = {
		red: new Player('Red', new inputs.button(buttonInputs.red)),
		green: new Player('Green', new inputs.button(buttonInputs.green))
	};

	var vm = this;
	this.players.red.button.onDown(function() {
		vm.winPoint(vm.players.red);
	});

	this.players.green.button.onDown(function() {
		vm.winPoint(vm.players.green);
	});

	this.startGame = function () {
		this.players.red.score = 0;
		this.players.green.score = 0;
	}

	this.winPoint = function(player) {
		player.score += 1;
		var enemy;
		if (player.name == 'Red') {
			enemy = players.green;
		} else {
			enemy = players.red;
		}
		if (player.score >= 11 && (player.score - enemy.score) >= 2) {
			this.endGame(player);
			return;
		}
		this.output.print('Red: ' + this.players.red.score + '   Green: ' + this.players.green.score);
		if (player.score > 10) {
			this.endGame(player);
		}
		this.sound.playSound('newPoint');
	}

	this.endGame = function (winningPlayer) {	
		this.output.print(winningPlayer.name + ' has won!');
		this.sound.playSound('winner');
		this.startGame();
	}
};

module.exports = Game;