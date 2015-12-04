var gpio = require("pi-gpio");

gpio.setMode('MODE_BCM');

gpio.close(7); 
gpio.close(10);
gpio.close(9);


var Game = require("./game.js");
var Output = require("./output.js");

var game = new Game(new Output());

var repl = require('repl');
var replServer = repl.start('> ');

var shutdown = function() {
	greenButton.cleanUp().then(process.exit);
};

var replServer = repl.start('> ');
replServer.context.shutdown = shutdown;

/*
var ledOn = function(callback) {
  gpio.open(ledPin, "output", function(err) {
    gpio.write(ledPin, 1, function() {

    });
  });
}

var ledOff = function(callback) {
  gpio.close(ledPin, callback);
}

var shutdown = function() {
	ledOff(process.exit);
};

var readButton = function(pin, callback) {
	gpio.open(pin, "input pullup", function(err) {
	    gpio.read(pin, callback);
	});
};

var loop = function(){
	buttonInputs.forEach(function(id){
		readButton(id, function(err, value) {
			console.log(value);
    	});
	});
	setTimeout(loop, 10);
};

loop();

var repl = require('repl');

var replServer = repl.start('> ');
replServer.context.ledOn = ledOn;
replServer.context.ledOff = ledOff;
replServer.context.shutdown = shutdown;
*/