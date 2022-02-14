import { tabToChangeCamera } from './TabToChangeCamera.js';
import { KeyCode } from  "../volatile/requires.js"

/**
 * Controls for when the game is paused
 * @param {GameManager} GM The game manager
 */
function pausedControls(GM) {
	if (GM.pressedKeys[KeyCode.KEY_ESCAPE] === true) {
        GM.unPause();
    }
    
    tabToChangeCamera(GM);
}

export { pausedControls };