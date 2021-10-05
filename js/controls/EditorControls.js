import { flyControls } from "./FlyControls.js"

/**
 * Handle inputs for the main game loop
 * @param {GameManager} GM 
 */
function editorControls(GM) {
	flyControls(GM);
	
	// Mouse buttons
	if (GM.heldMouseButtons[0] === true) {
		console.log("holding lmb");
	}

	if (GM.heldMouseButtons[2] === true) {
		console.log("holding rmb");
	}
}

export { editorControls };