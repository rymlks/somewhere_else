import { flyControls } from "./FlyControls.js"

/**
 * Handle inputs for the main game loop
 * @param {GameManager} GM 
 */
function mainControls(GM) {
	flyControls(GM);
}

export { mainControls };