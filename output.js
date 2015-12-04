var Output = function() {
	this.constants = {
		ERROR : 'Error',
		STABLE: 'Stable'
	}

	this.status = this.constants.STABLE;

	this.print = function (text) {
		//change when screen is working
		console.log('> ' + text);
	}
}

module.exports = Output;