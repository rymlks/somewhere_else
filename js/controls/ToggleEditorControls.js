
import { GameState } from "../core/GameState.js"

const KeyCode = require('Keycode-js');

/**
 * Handle inputs for the main game loop
 * @param {GameManager} GM 
 */
function toggleEditorControls(GM) {
	if (GM.pressedKeys[KeyCode.KEY_F1]) {
		if (GM.gameState === GameState.EDITOR) {
            GM.endEditor();
        } else if (GM.gameState === GameState.DEFAULT) {
            GM.beginEditor();
        }
	}
}

export { toggleEditorControls };