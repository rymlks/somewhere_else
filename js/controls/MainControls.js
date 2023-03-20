import { walkControls } from "./WalkControls.js"
import { flyControls } from "./FlyControls.js"

/**
 * Handle inputs for the main game loop
 * @param {GameManager} GM 
 */
function mainControls(GM) {
	GM.renderer.showBoundingBoxes = true;
	walkControls(GM);
}

export { mainControls };