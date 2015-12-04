var gpio = require("pi-gpio");

var pin = 7; 

gpio.open(pin, "output", function(err) {
    gpio.write(pin, 1, function() {
        setTimeout(function() {
        	gpio.close(pin); 
    	}, 1000);
    });
});
