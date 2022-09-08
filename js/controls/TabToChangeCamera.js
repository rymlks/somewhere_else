import * as THREE from "../three.js/build/three.module.js";
import { KeyCode } from  "../volatile/requires.js"

/**
 * Handle inputs for the main game loop
 * @param {GameManager} GM 
 */

var background;

 function tabToChangeCamera(GM) {
	// Tab to switch perspective
	if ((GM.pressedKeys[KeyCode.KEY_TAB] || GM.pressedKeys[KeyCode.KEY_BACK_QUOTE]) && GM.camera.isOrthographicCamera4D === true) {
		//console.log("make perspec");
		var cam = new THREE.DoublyPerspectiveCamera4D().copy(GM.camera);
        cam.position.copy(GM.camera.position);
        cam.rotation.copy(GM.camera.rotation);
        GM.camera = cam;
		GM.player.add(cam);

		background = GM.scene.background;
		GM.scene.background = null;
	} else if ((GM.pressedKeys[KeyCode.KEY_TAB] || GM.pressedKeys[KeyCode.KEY_BACK_QUOTE]) && GM.camera.isPerspectiveCamera4D === true) {
		//console.log("make ortho");
		var cam = new THREE.PerspectiveCamera4D().copy(GM.camera);
        cam.position.copy(GM.camera.position);
        cam.rotation.copy(GM.camera.rotation);
        GM.camera = cam;
		GM.player.add(cam);

		GM.scene.background = background;
	}
}

export { tabToChangeCamera };