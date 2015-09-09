var fs = require('fs');
var extend = require('util')._extend;
var spawn = require('child_process').spawn;
var DEFAULT_SETTINGS = {music_directory: ".",
						base_directory: ".", // in which directory start change-directory command
						mplayer_options: [], // additional options for mplayer
						// fifo for output current song
						output_file: "/tmp/.fifo-player-song",
						seek_seconds: 10, // seconds of relative seek
						// file that stores current working directory of player
						current_directory_storage: "/tmp/.fifo-player-dir",
						// input/output fifos
						mplayer_fifo: "/tmp/.mplayer-input",
						input_fifo: "/tmp/.fifo-player-input"
					}
exports.init = function (file) {
	var imported_settings = {};
	try{
		imported_settings = JSON.parse(fs.readFileSync(file, 'utf8'))
	}catch(e){
		console.log(e.message, "Fallback to default settings");
	}
	var s = exports.settings = extend(DEFAULT_SETTINGS, imported_settings);
	s.base_directory = s.base_directory.replace(/\/+$/, "") + "/";
	s.music_directory = s.music_directory.replace(/\/+$/, "") + "/";
	try{
		fs.statSync(s.mplayer_fifo);
	}catch(e){ // file doesn't exists
		spawn("mkfifo", [s.mplayer_fifo]);
	}
		try{
		fs.statSync(s.output_file);
	}catch(e){ // file doesn't exists
		spawn("mkfifo", [s.output_file]);
	}
	try{
		fs.statSync(s.input_fifo);
	}catch(e){ // file doesn't exists
		spawn("mkfifo", [s.input_fifo]);
	}
	return s;
}
