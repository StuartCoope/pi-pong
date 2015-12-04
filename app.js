var gpio = require("pi-gpio");
var inputs = require("inputs");
var ledPin = 7;

var buttonInputs = [11];

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