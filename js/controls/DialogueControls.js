
/**
 * Controls for when a dialog box is open
 * @param {GameManager} GM 
 */
function dialogueControls(GM) {
	if (GM.pressedKeys[KeyCode.KEY_ESCAPE] === true) {
        GM.exitDialogue();
    }
}

export { dialogueControls };