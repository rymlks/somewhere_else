import { KeyCode } from  "../volatile/requires.js"

/**
 * Controls for when a dialog box is open
 * @param {GameManager} GM 
 */
function dialogueControls(GM) {
	if (GM.pressedKeys[KeyCode.KEY_ESCAPE] === true) {
        GM.exitDialogue();
    }

    if (GM.pressedKeys[KeyCode.KEY_T] === true) {
        GM.advanceDialogue();
    }

    if (GM.pressedKeys[KeyCode.KEY_W] === true) {
        GM.increaseDialogueSelection();
    }

    if (GM.pressedKeys[KeyCode.KEY_S] === true) {
        GM.decreaseDialogueSelection();
    }
}

export { dialogueControls };