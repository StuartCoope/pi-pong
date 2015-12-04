var Output = function() {
	this.constants = {
		ERROR : 'Error',
		STABLE: 'Stable'
	}

	this.status = this.constants.STABLE;
}

Output.prototype.print = function(text) {
	//change when screen is working
	console.log(text);
}

module.exports = Object.create(Output.prototype);