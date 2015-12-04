var fs = require('fs');

var Sound = function () {
	this.modes = {
		'beginGame' : 'game_start',
		'matchPoint' : 'match_point',
		'winner' : 'victory',
		'newPoint' : 'new_point'
	} ;

 	this.audioPlayer = require('play-sound')(opts = {player: 'mpg123'});
 	
 	var vm = this;
 	this.playSound = function (type) {
 		fs.readdir('sounds/' + vm.modes[type] + '/', function(err, files) {
 			var ri = Math.floor(Math.random() * files.length);
 			vm.audioPlayer.play('sounds/' + vm.modes[type] + '/' + files[ri], function (err) {

 			});
 		});
 		
 	}
};

module.exports = Sound;