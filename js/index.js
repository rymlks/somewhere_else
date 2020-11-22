import {GameManager} from "./core/GameManager.js";
import {DevScene} from "./scenes/dev/DevScene.js";

var GM = new GameManager();
GM.scene = new DevScene();
GM.play();

// Debug stuff

var infodiv = document.getElementById("info");
function updateInfoDiv() {
	requestAnimationFrame( animate );

	infodiv.innerHTML  = "x: " + GM.camera.position.x.toPrecision(4) + ", ";
	infodiv.innerHTML += "y: " + GM.camera.position.y.toPrecision(4) + ", ";
	infodiv.innerHTML += "z: " + GM.camera.position.z.toPrecision(4) + ", ";
	infodiv.innerHTML += "w: " + GM.camera.position.w.toPrecision(4);
	infodiv.innerHTML += "<br/>";
	infodiv.innerHTML += "yz: " + (GM.camera.rotation.yz * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "zx: " + (GM.camera.rotation.zx * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "xy: " + (GM.camera.rotation.xy * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "xw: " + (GM.camera.rotation.xw * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "yw: " + (GM.camera.rotation.yw * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "zw: " + (GM.camera.rotation.zw * 180 / Math.PI).toPrecision(4);
}
updateInfoDiv();