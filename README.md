# Fifo-player
Mplayer wrapper.
Application is controlled by named pipe.
It uses config file for settings, config must place in folder with program with name `player-config.json`

## Config example:
```javascript
{"music_directory": ".", 	// default directory with music
"base_directory": ".", 		// in which directory start change-directory command
"mplayer_options": [], 		// additional options for mplayer
"output_file": "/tmp/.song",// file for output current song
"seek_seconds": 10, 		// seconds of relative seek
// file that stores current working directory of player
"current_directory_storage": "/tmp/.fifo-player-dir",
// fifo used by program to control mplayer
"mplayer_fifo": "/tmp/.mplayer-input",
// fifo used to control program
"input_fifo": "/tmp/.fifo-player-input"
}
```

## Available commands:
 - `next` - start next random song
 - `pause` - pause player
 - `loop` - infinitely play current song / disable infinite loop
 - `play-file` - shows window to select what file to play
 - `change-folder` - shows window to select music folder
 - `change-random` - switch beetween random and successive selecting of next song
 - `seek-forward` - seek forward to `seek_seconds` seconds
 - `seek-forward` - seek backward to `seek_seconds` seconds
 - `increase-volume`
 - `decrease-volume`

## Usage example:
```bash
... # your wmiirc
# fifo-player fifo
PLAYER_FIFO_IN=/tmp/.fifo-player-input
startup() {
	nw fifo-player.nw &>> player.log &
}
...
# somewhere at shortcut definitions
KeyGroup Player
Key Mod3-q
	echo pause > $PLAYER_FIFO_IN &
Key Mod3-x
	echo next > $PLAYER_FIFO_IN &
Key Mod3-z
	echo play-file > $PLAYER_FIFO_IN &
```

## License
This software is licensed under the [MIT license](LICENSE).
