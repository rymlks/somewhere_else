import * as THREE from "../three.js/src/Three.js"
import { flyControls } from "./FlyControls.js"
import { Gizmo } from "../objectLoaders/Gizmo.js"

const KeyCode = require('Keycode-js');
        
var gizmo = new Gizmo( false, false );
gizmo.name = "Selection Gizmo";
gizmo.isAffectedByGravity = false;
gizmo.visible = false;

var gizmoAdded = false;
var selection = null;
var heldGizmo = null;

var projectedPoint = new THREE.Vector4();

var gizmoDirection = new THREE.Vector4();

/**
 * Handle inputs for the main game loop
 * @param {GameManager} GM 
 */
function editorControls(GM) {
	if (!gizmoAdded) {
		GM.scene.add(gizmo);
		gizmoAdded = true;
	}

	flyControls(GM);

	if (GM.pressedKeys[KeyCode.KEY_BACK_QUOTE]) {
		GM.renderer.showBoundingBoxes = !GM.renderer.showBoundingBoxes;
	}
	
	var rayPlane = new THREE.RayPlane4D();
	rayPlane.applyMatrix5(GM.camera.matrixWorld);

	// LMB clicked
	if (GM.pressedMouseButtons[0] === true) {
		var obj = rayPlane.cast(10, GM.scene);
		//console.log(obj);

		if (obj === null) {
			deselect();
		} else if (obj.isGizmo === true) {
			console.log(obj);	
			heldGizmo = obj;
		} else {
			select(obj);
		}
	}
	
	// LMB held down
	if (GM.heldMouseButtons[0] === true && heldGizmo !== null) {
		var speed = GM.timeDelta;
		if (GM.heldKeys[KeyCode.KEY_CONTROL]) {
			speed *= -1;
		}
		heldGizmo.getWorldDirection(gizmoDirection);
		gizmoDirection.multiplyScalar(speed);
		projectedPoint.copy(selection.position);
		projectedPoint.add(gizmoDirection);

		selection.position.copy(projectedPoint);

	} else if (GM.heldMouseButtons[0] !== true){
		heldGizmo = null;
	}

	// RMB held down
	if (GM.heldMouseButtons[2] === true) {
	}
	
}

function select(object) {
	deselect();

	//gizmo.rotation.copy(object.rotation);
	//gizmo.position.copy(object.position);

	gizmo.setActive(true);
	object.add(gizmo);
	object.noCollision = true;
	selection = object;
}

function deselect() {
	if (selection !== null) {
		selection.noCollision = false;
	}
	selection = null;
	gizmo.setActive(false);
}

export { editorControls };