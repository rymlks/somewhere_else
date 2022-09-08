import * as THREE from "../three.js/build/three.module.js";

// General utils
var forward = new THREE.Vector5(0, 0, -1, 0);
var backward = new THREE.Vector5(0, 0, 1, 0);
var left = new THREE.Vector5(-1, 0, 0, 0);
var right = new THREE.Vector5(1, 0, 0, 0);
var up = new THREE.Vector5(0, 1, 0, 0);
var down = new THREE.Vector5(0, -1, 0, 0);
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
var pressedMouseButtons = {};
var heldMouseButtons = {};
var releasedMouseButtons = {};
var mouseAxis = new MouseMovement();
var mouseWheel = new WheelMovement();

function keyReleased(e) { 
	heldKeys[e.keyCode] = false; 
	releasedKeys[e.keyCode] = true; 
	
	e.preventDefault()
}

function keyPressed(e) {
	if (heldKeys[e.keyCode] !== true) {
		pressedKeys[e.keyCode] = true; 
	}
	heldKeys[e.keyCode] = true; 
	
	e.preventDefault()
}

function mouseMoved(e) {
	mouseAxis._horizontal += e.movementX;
	mouseAxis._vertical += e.movementY;
	
	e.preventDefault()
}

function wheelScrolled(e) {
	mouseWheel._delta += e.deltaY;
	
	e.preventDefault()
}

function mouseReleased(e) { 
	heldMouseButtons[e.button] = false; 
	releasedMouseButtons[e.button] = true; 
	
	e.preventDefault()
}

function mousePressed(e) { 
	if (heldMouseButtons[e.button] !== true) {
		pressedMouseButtons[e.button] = true; 
	}
	heldMouseButtons[e.button] = true; 
	
	e.preventDefault()
}

export { keyReleased, keyPressed, mouseReleased, mousePressed, mouseMoved, wheelScrolled, clampTo180,
		 forward, backward, left, right, up, down, squidward, squodward, 
		 pressedKeys, heldKeys, releasedKeys, pressedMouseButtons, heldMouseButtons, releasedMouseButtons,
		 mouseAxis, mouseWheel };