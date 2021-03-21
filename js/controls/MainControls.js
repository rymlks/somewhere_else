import * as THREE from "../three.js/src/Three.js";
import { clampTo180, forward, backward, up, down, left, right, squidward, squodward, heldKeys } from "./utils.js"


var rotationLerp = 0.25;
var positionLerp = 0.25;

var rotationspeed = Math.PI * 0.0005;
var _euler = null;
var _pos = null;

var sforward = new THREE.Vector5();
var sbackward  = new THREE.Vector5();
var sleft = new THREE.Vector5();
var sright = new THREE.Vector5();
var sup = new THREE.Vector5();
var sdown = new THREE.Vector5();
var ssquidward = new THREE.Vector5();
var ssquodward = new THREE.Vector5();

function mainControls(GM) {

	// Check for pause
	if (GM.pressedKeys[KeyCode.KEY_ESCAPE] === true) {
		GM.pause();
		return;
    }

	// Scale directional vectors by time passed
	sforward.copy(forward).multiplyScalar(GM.timeScaledSpeed);
	sbackward.copy(backward).multiplyScalar(GM.timeScaledSpeed);
	sleft.copy(left).multiplyScalar(GM.timeScaledSpeed);
	sright.copy(right).multiplyScalar(GM.timeScaledSpeed);
	sup.copy(up).multiplyScalar(GM.timeScaledSpeed);
	sdown.copy(down).multiplyScalar(GM.timeScaledSpeed);
	ssquidward.copy(squidward).multiplyScalar(GM.timeScaledSpeed);
	ssquodward.copy(squodward).multiplyScalar(GM.timeScaledSpeed);

	var walkingEuler = GM.camera.rotation.clone();
	walkingEuler.yz = 0;
	walkingEuler.yw = 0;
	var rotato = new THREE.Matrix5().makeRotationFromEuler(walkingEuler);
	var mouseHorizontal = GM.mouseHorizontal;
	var mouseVertical = GM.mouseVertical;
	var wheelDelta = GM.mouseWheel;
	if (_euler === null) {
		_euler = new THREE.Euler4D().copy(GM.camera.rotation);
	}
	if (_pos === null) {
		_pos = new THREE.Vector5().copy(GM.camera.position);
	}

	// WASD keys
	if (GM.heldKeys[KeyCode.KEY_W] === true) {
		if (GM.heldKeys[KeyCode.KEY_SHIFT] !== true) {
			_pos.add(rotato.multiplyVector(sforward));
		} else {
			_pos.add(rotato.multiplyVector(ssquidward));
		}
	}
	if (GM.heldKeys[KeyCode.KEY_S] === true) {
		if (GM.heldKeys[KeyCode.KEY_SHIFT] !== true) {
			_pos.add(rotato.multiplyVector(sbackward));
		} else {
			_pos.add(rotato.multiplyVector(ssquodward));
		}
	}
	if (GM.heldKeys[KeyCode.KEY_D] === true) {
		_pos.add(rotato.multiplyVector(sright));
	}
	if (GM.heldKeys[KeyCode.KEY_A] === true) {
		_pos.add(rotato.multiplyVector(sleft));
	}

	// Capslock/Space
	if (GM.heldKeys[KeyCode.KEY_SPACE] === true) {
		_pos.add(sup);
	}
	if (GM.heldKeys[KeyCode.KEY_CAPS_LOCK] === true) {
		_pos.add(sdown);
	}


	// Credit to haley
	if (GM.heldKeys[38] === true ) {
		_euler.yw = clampTo180(_euler.yw - 10 * rotationspeed);
	}
	if (GM.heldKeys[40] === true ) {
		_euler.yw = clampTo180(_euler.yw + 10 * rotationspeed);
	}
	if (GM.heldKeys[37] === true ) {
		_euler.xw = _euler.xw - 10 * rotationspeed;
	}
	if (GM.heldKeys[39] === true ) {
		_euler.xw = _euler.xw + 10 * rotationspeed;
	}

	
	// Mouse movement
	if (GM.heldKeys[KeyCode.KEY_SHIFT] !== true) {
		_euler.zx -= mouseHorizontal * rotationspeed;

		// Do not allow more than 90 degrees up/down rotation.
		_euler.yz = clampTo180(_euler.yz - mouseVertical * rotationspeed);
	} else {
		_euler.xw += mouseHorizontal * rotationspeed;

		// Do not allow more than 90 degrees up/down rotation.
		_euler.yw = clampTo180(_euler.yw - mouseVertical * rotationspeed);
	}

	if (GM.heldKeys[KeyCode.KEY_L] === true) {
		document.body.requestPointerLock();
	}
	

	_euler.zw += wheelDelta * rotationspeed;

	GM.camera.position.lerp(_pos, positionLerp);
	GM.camera.rotation.lerp(_euler, rotationLerp);
}

export { mainControls };