import { tabToChangeCamera } from './TabToChangeCamera.js';
import { KeyCode } from  "../volatile/requires.js"

var firstKeyUp = true;

/**
 * Controls for when the game is paused
 * @param {GameManager} GM The game manager
 */
function pausedControls(GM) {
	if (GM.releasedKeys[KeyCode.KEY_ESCAPE] === true && firstKeyUp) {
        firstKeyUp = false;
    } else if (GM.releasedKeys[KeyCode.KEY_ESCAPE] === true) {
        firstKeyUp = true;
        GM.unPause();
    }
    
    tabToChangeCamera(GM);
}

export { pausedControls };