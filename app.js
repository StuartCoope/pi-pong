var gpio = require("pi-gpio");

var ledPin = 7;

var ledOn = function(callback) {
	gpio.open(ledPin, "output", function(err) {
	    gpio.write(ledPin, 1, function() {

	    });
	});
}

var ledOff = function(callback) {
	gpio.close(ledPin, callback);
}

var shutdown = function(){
	ledOff(process.exit);
};

var repl = require('repl');

var replServer = repl.start('> ');
replServer.context.ledOn = ledOn;
replServer.context.ledOff = ledOff;
replServer.context.shutdown = shutdown;