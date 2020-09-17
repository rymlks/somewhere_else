import * as THREE from "./three.js/src/Three.js";

class MouseMovement {
	constructor() {
		this._horizontal = 0;
		this._vertical = 0;
	}

	get horizontal() {
		var ret = this._horizontal;
		this._horizontal = 0;

		return ret;
	}

	get vertical() {
		var ret = this._vertical;
		this._vertical = 0;

		return ret;
	}
}

class WheelMovement {
	constructor() {
		this._delta = 0;
	}

	get delta() {
		var ret = this._delta;
		this._delta = 0;

		return ret;
	}
}

var pressedKeys = {};
var mouseAxis = new MouseMovement();
var mouseWheel = new WheelMovement();

var clock = new THREE.Clock();

var orbit = 3;
var speed = 0.1;
var rotationspeed = Math.PI * 0.0005;
var theta = 0;

var forward = new THREE.Vector5(0, 0, -speed, 0);
var backward = new THREE.Vector5(0, 0, speed, 0);
var left = new THREE.Vector5(-speed, 0, 0, 0);
var right = new THREE.Vector5(speed, 0, 0, 0);
var squidward = new THREE.Vector5(0, 0, 0, -speed);
var squodward = new THREE.Vector5(0, 0, 0, speed);

// Define input handlers
function keyReleased(e) { pressedKeys[e.keyCode] = false; }

function keyPressed(e) { pressedKeys[e.keyCode] = true; }

function mouseMoved(e) {
	mouseAxis._horizontal += e.movementX;
	mouseAxis._vertical += e.movementY;
}
function wheelScrolled(e) {
	mouseWheel._delta += e.deltaY;
}

// Handle inputs
function handleControls(scene, camera) {
	var delta = clock.getDelta();
	theta += 0.25 * delta;

	var walkingEuler = camera.rotation.clone();
	walkingEuler.yz = 0;
	walkingEuler.yw = 0;
	var rotato = new THREE.Matrix5().makeRotationFromEuler(walkingEuler);
	var mouseHorizontal = mouseAxis.horizontal;
	var mouseVertical = mouseAxis.vertical;
	var wheelDelta = mouseWheel.delta;

	// WASD keys
	if (pressedKeys[KeyCode.KEY_W] === true) {
		if (pressedKeys[KeyCode.KEY_SHIFT] !== true) {
			camera.position.add(rotato.multiplyVector(forward));
		} else {
			camera.position.add(rotato.multiplyVector(squidward));
		}
	}
	if (pressedKeys[KeyCode.KEY_S] === true) {
		if (pressedKeys[KeyCode.KEY_SHIFT] !== true) {
			camera.position.add(rotato.multiplyVector(backward));
		} else {
			camera.position.add(rotato.multiplyVector(squodward));
		}
	}
	if (pressedKeys[KeyCode.KEY_D] === true) {
		camera.position.add(rotato.multiplyVector(right));
	}
	if (pressedKeys[KeyCode.KEY_A] === true) {
		camera.position.add(rotato.multiplyVector(left));
	}

	
	// Mouse movement
	if (pressedKeys[KeyCode.KEY_SHIFT] !== true) {
		camera.rotation.zx -= mouseHorizontal * rotationspeed;
		camera.rotation.zx = camera.rotation.zx % (Math.PI *2);

		// Do not allow more than 90 degrees up/down rotation.
		camera.rotation.yz = _clampTo180(camera.rotation.yz - mouseVertical * rotationspeed);
	} else {
		camera.rotation.xw -= mouseHorizontal * rotationspeed;
		camera.rotation.xw = camera.rotation.xw % (Math.PI *2);

		// Do not allow more than 90 degrees up/down rotation.
		camera.rotation.yw = _clampTo180(camera.rotation.yw - mouseVertical * rotationspeed);
	}

	if (pressedKeys[KeyCode.KEY_L] === true) {
		document.body.requestPointerLock();
	}

	camera.rotation.zw += wheelDelta * rotationspeed;
	
}

function _clampTo180(angle) {
	return Math.max(-Math.PI * 0.5, Math.min(Math.PI * 0.5, angle));
}

export {
		handleControls, keyPressed, keyReleased, mouseMoved, wheelScrolled, 
		MouseMovement, WheelMovement, 
		pressedKeys, mouseAxis, mouseWheel
	}