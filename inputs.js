"use strict";

var gpio = require("pi-gpio");
var q = require('q');

var events = [];

var button = function(pin) {
	var buttonPushedState = 0;

	this.pin = pin;
	var state = false;
	var onUp = null;
	var onDown = null;

	var canRead = false;

	this.onUp = function(fn) {
		onUp = fn;
	};

	this.onDown = function(fn) {
		onDown = fn;
	};

	var checkResult = function(result) {
		if(result !== state){
			if(result === buttonPushedState) {
				onUp();
			}else{
				onDown();
			}
		}
		state = result;
	};

	events.push(function(){
		var deferred = q.defer();
		if(!canRead){ return };

	    gpio.read(pin, function(err, value){
	    	checkResult(value);

			if(err) deferred.reject(err);
			deferred.resolve(value);
	    });
	
		return deferred.promise;
	});

	this.cleanUp = function(){
		if(!canRead) return;

		var deferred = q.defer();
		gpio.close(pin, function(){
			deferred.resolve();
		});
		return deferred.promise;
	}


	gpio.open(pin, "input pullup", function(err) {
		if(err){
			console.log(err);
		}else{
			canRead = true;
		}
	});

};

var led = function(pin) {
	var on = false;
	var pin = pin;
	var canRead = false;

	this.on = function() {
		if(!canRead) return;

		if(!on){
			gpio.write(pin, 1);
		}
		on = true;
	};

	this.off = function() {
		if(!canRead) return;
		
		if(on) {
			gpio.write(pin, 0);	
		}
		on = false;
	};

	this.cleanUp = function(){
		if(!canRead) return;

		var deferred = q.defer();
		gpio.close(pin, function(){
			deferred.resolve();
		});
		return deferred.promise;
	}

	gpio.open(pin, "output", function(err) {
		if(err){
			console.log(err);
		}else{
			canRead = true;
		}
	});

};

var eventLoop = function() {
	var promises = [];
	events.forEach(function(e) {
		promises.push(e());
	});

	q.all(promises).then(function(results){
		setTimeout(eventLoop, 20);
	});
}

eventLoop();

module.exports = {
	button: button,
	led: led,
	display: null
};