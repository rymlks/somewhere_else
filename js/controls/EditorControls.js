import { flyControls } from "./FlyControls.js"

/**
 * Handle inputs for the main game loop
 * @param {GameManager} GM 
 */
function editorControls(GM) {
	flyControls(GM);
}

export { editorControls };