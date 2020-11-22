import * as THREE from "../three.js/src/Three.js";
import { clampTo180, forward, backward, left, right, squidward, squodward } from "./utils.js"


var rotationspeed = Math.PI * 0.0005;
var theta = 0;

function mainControls(GM) {

	// Check for pause
	if (GM.pressedKeys[KeyCode.KEY_ESCAPE] === true) {
		GM.pause();
		return;
    }

	var sforward = new THREE.Vector5().copy(forward).multiplyScalar(GM.timeScaledSpeed);
	var sbackward  = new THREE.Vector5().copy(backward).multiplyScalar(GM.timeScaledSpeed);
	var sleft = new THREE.Vector5().copy(left).multiplyScalar(GM.timeScaledSpeed);
	var sright = new THREE.Vector5().copy(right).multiplyScalar(GM.timeScaledSpeed);
	var ssquidward = new THREE.Vector5().copy(squidward).multiplyScalar(GM.timeScaledSpeed);
	var ssquodward = new THREE.Vector5().copy(squodward).multiplyScalar(GM.timeScaledSpeed);

	theta += 0.25 * GM.delta;

	var walkingEuler = GM.camera.rotation.clone();
	walkingEuler.yz = 0;
	walkingEuler.yw = 0;
	var rotato = new THREE.Matrix5().makeRotationFromEuler(walkingEuler);
	var mouseHorizontal = GM.mouseHorizontal;
	var mouseVertical = GM.mouseVertical;
	var wheelDelta = GM.mouseWheel;

	// WASD keys
	if (GM.heldKeys[KeyCode.KEY_W] === true) {
		if (GM.heldKeys[KeyCode.KEY_SHIFT] !== true) {
			GM.camera.position.add(rotato.multiplyVector(sforward));
		} else {
			GM.camera.position.add(rotato.multiplyVector(ssquidward));
		}
	}
	if (GM.heldKeys[KeyCode.KEY_S] === true) {
		if (GM.heldKeys[KeyCode.KEY_SHIFT] !== true) {
			GM.camera.position.add(rotato.multiplyVector(sbackward));
		} else {
			GM.camera.position.add(rotato.multiplyVector(ssquodward));
		}
	}
	if (GM.heldKeys[KeyCode.KEY_D] === true) {
		GM.camera.position.add(rotato.multiplyVector(sright));
	}
	if (GM.heldKeys[KeyCode.KEY_A] === true) {
		GM.camera.position.add(rotato.multiplyVector(sleft));
	}

	
	// Mouse movement
	if (GM.heldKeys[KeyCode.KEY_SHIFT] !== true) {
		GM.camera.rotation.zx -= mouseHorizontal * rotationspeed;
		GM.camera.rotation.zx = GM.camera.rotation.zx % (Math.PI *2);

		// Do not allow more than 90 degrees up/down rotation.
		GM.camera.rotation.yz = clampTo180(GM.camera.rotation.yz - mouseVertical * rotationspeed);
	} else {
		GM.camera.rotation.xw += mouseHorizontal * rotationspeed;
		GM.camera.rotation.xw = GM.camera.rotation.xw % (Math.PI *2);

		// Do not allow more than 90 degrees up/down rotation.
		GM.camera.rotation.yw = clampTo180(GM.camera.rotation.yw - mouseVertical * rotationspeed);
	}

	if (GM.heldKeys[KeyCode.KEY_L] === true) {
		document.body.requestPointerLock();
	}
	

	GM.camera.rotation.zw += wheelDelta * rotationspeed;
	GM.camera.rotation.zw = GM.camera.rotation.zw % (Math.PI *2);	
	
}

export { mainControls };