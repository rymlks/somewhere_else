import * as THREE from "../three.js/build/three.module.js";
const KeyCode = require('Keycode-js');

/**
 * Handle inputs for the main game loop
 * @param {GameManager} GM 
 */
 function tabToChangeCamera(GM) {
	// Tab to switch perspective
	if (GM.pressedKeys[KeyCode.KEY_TAB] && GM.camera.isOrthographicCamera4D === true) {
		console.log("make perspec");
		var cam = new THREE.DoublyPerspectiveCamera4D().copy(GM.camera);
        cam.position.copy(GM.camera.position);
        cam.rotation.copy(GM.camera.rotation);
        GM.camera = cam;
		GM.player.add(cam);
	} else if (GM.pressedKeys[KeyCode.KEY_TAB] && GM.camera.isPerspectiveCamera4D === true) {
		console.log("make ortho");
		var cam = new THREE.PerspectiveCamera4D().copy(GM.camera);
        cam.position.copy(GM.camera.position);
        cam.rotation.copy(GM.camera.rotation);
        GM.camera = cam;
		GM.player.add(cam);
	}
}

export { tabToChangeCamera };