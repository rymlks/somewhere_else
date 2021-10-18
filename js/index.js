import {GameManager} from "./core/GameManager.js";
import {DevScene} from "./scenes/dev/DevScene.js";
import {DemoScene} from "./scenes/dev/DemoScene.js";
import {EditorScene} from "./scenes/util/EditorScene.js";
import {QuadScene} from "./scenes/util/QuadScene.js";

var GM = new GameManager();
GM.scene = new EditorScene();
//GM.scene = new DemoScene();
//GM.scene = new DevScene();
GM.play();
GM.beginEditor();
GM.FPSBufferSize = 100;

// Debug stuff

var infodiv = document.getElementById("info");
function updateInfoDiv() {
	infodiv.innerHTML  = "x: " + GM.camera.position.x.toPrecision(4) + ", ";
	infodiv.innerHTML += "y: " + GM.camera.position.y.toPrecision(4) + ", ";
	infodiv.innerHTML += "z: " + GM.camera.position.z.toPrecision(4) + ", ";
	infodiv.innerHTML += "w: " + GM.camera.position.w.toPrecision(4) + ", ";
	infodiv.innerHTML += "MSFP: " + (GM.maxSecondsPerFrame * 1000).toPrecision(4);
}
setInterval(updateInfoDiv, 1000);