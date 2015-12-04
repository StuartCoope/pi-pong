var inputs = require("./inputs.js");
var Player = require("./player.js");
var redButton = new inputs.led(7);

var buttonInputs = {
	red : 13,
	green: 11
}
var buttonInputs = 
var Game = function(output) {
	this.output = output;
	this.players = {
		red: new Player('Red', new inputs.button(buttonInputs.red)),
		green: new Player('Green', new inputs.button(buttonInputs.green))
	};

	this.players.Red.onDown(function() {
		this.winPoint(this.players.red);
	});

	this.players.Green.onDown(function() {
		this.winPoint(this.players.green);
	});
};

Game.prototype.winPoint = function(player) {
	player.score += 1;
	this.output.print('Red: ' this.players.red.score + '   Green: ' + this.players.green.score)
	if (player.score > 10) {
		this.endGame(player);
	}
}
Game.prototype.endGame(winningPlayer) {
	this.output.print(winningPlayer.name + ' has won!');
}

module.exports = Object.create(Game.prototype, {});