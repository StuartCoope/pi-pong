var gpio = require("pi-gpio");
gpio.close(7); 
gpio.close(11);
gpio.close(13);

var inputs = require("./inputs.js");
var ledPin = 7;

var buttonInputs = [11];

var greenButton = new inputs.button(11);
var redButton = new inputs.button(13);
var led = new inputs.led(7);

redButton.onUp(function(){
	console.log("Red Up");
});

redButton.onDown(function(){
	console.log("Red Down");
});

greenButton.onUp(function(){
	led.on();
	console.log("Green Up");
});

greenButton.onDown(function(){
	led.off();
	console.log("Green Down");
});

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