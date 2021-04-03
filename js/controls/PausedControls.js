const KeyCode = require('Keycode-js');

/**
 * Controls for when the game is paused
 * @param {GameManager} GM The game manager
 */
function pausedControls(GM) {
	if (GM.pressedKeys[KeyCode.KEY_ESCAPE] === true) {
        GM.unPause();
    }
}

export { pausedControls };