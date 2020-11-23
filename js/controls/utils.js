import * as THREE from "../three.js/src/Three.js";

// General utils
var forward = new THREE.Vector5(0, 0, -1, 0);
var backward = new THREE.Vector5(0, 0, 1, 0);
var left = new THREE.Vector5(-1, 0, 0, 0);
var right = new THREE.Vector5(1, 0, 0, 0);
var squidward = new THREE.Vector5(0, 0, 0, -1);
var squodward = new THREE.Vector5(0, 0, 0, 1);

function clampTo180(angle) {
	return Math.max(-Math.PI * 0.5, Math.min(Math.PI * 0.5, angle));
}

// GM-specific utils
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
var heldKeys = {};
var releasedKeys = {};
var mouseAxis = new MouseMovement();
var mouseWheel = new WheelMovement();

function keyReleased(e) { 
	heldKeys[e.keyCode] = false; 
	releasedKeys[e.keyCode] = true; 
}

function keyPressed(e) {
	if (heldKeys[e.keyCode] !== true) {
		pressedKeys[e.keyCode] = true; 
	}
	heldKeys[e.keyCode] = true; 
}

function mouseMoved(e) {
	mouseAxis._horizontal += e.movementX;
	mouseAxis._vertical += e.movementY;
}
function wheelScrolled(e) {
	mouseWheel._delta += e.deltaY;
}

export { keyReleased, keyPressed, mouseMoved, wheelScrolled, clampTo180,
		forward, backward, left, right, squidward, squodward, pressedKeys, heldKeys, releasedKeys, mouseAxis, mouseWheel };