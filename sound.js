var fs = require('fs');

var Sound = function () {
	this.modes = {
		'beginGame' : 'game_start',
		'matchPoint' : 'match_point',
		'winner' : 'victory',
		'newPoint' : 'new_point'
	} ;

 	this.audioPlayer = require('play-sound')(opts = {player: 'mpg123'});

 	this.playSound = function (type) {
 		fs.readdir('sounds/' + this.modes[type] + '/', function(err, files) {
 			var ri = Math.floor(Math.random() * files.length);
 			this.audioPlayer.play('sounds/' + this.modes[type] + '/' + files[ri]);
 		});
 		
 	}
};

module.exports = Sound;