var inputs = require("./inputs.js");
var Player = require("./player.js");
var redButton = new inputs.led(7);

var buttonInputs = {
	red : 13,
	green: 11
}
var Game = function(output) {
	this.output = output;
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

	this.winPoint = function(player) {
		player.score += 1;
		this.output.print('Red: ' + this.players.red.score + '   Green: ' + this.players.green.score);
		if (player.score > 10) {
			this.endGame(player);
		}
	}

	this.endGame = function (winningPlayer) {
		this.players.red.score = 0;
		this.players.green.score = 0;
		this.output.print(winningPlayer.name + ' has won!');
	}
};

module.exports = Game;