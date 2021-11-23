import {GameManager} from "./core/GameManager.js";
import {DevScene} from "./scenes/dev/DevScene.js";
import {DemoScene} from "./scenes/dev/DemoScene.js";
import {EditorScene} from "./scenes/util/EditorScene.js";
import {QuadScene} from "./scenes/util/QuadScene.js";

var GM = new GameManager();
//GM.scene = new EditorScene();
GM.setScene(new DemoScene());
//GM.scene = new DevScene();
GM.play();
//GM.beginEditor();
GM.FPSBufferSize = 100;

// Debug stuff

var infodiv = document.getElementById("info");
function updateInfoDiv() {
	infodiv.innerHTML  = "x: " + GM.player.position.x.toPrecision(4) + ", ";
	infodiv.innerHTML += "y: " + GM.player.position.y.toPrecision(4) + ", ";
	infodiv.innerHTML += "z: " + GM.player.position.z.toPrecision(4) + ", ";
	infodiv.innerHTML += "w: " + GM.player.position.w.toPrecision(4) + ", ";
	infodiv.innerHTML += "MSPF: " + (GM.maxSecondsPerFrame * 1000).toPrecision(4);
}
setInterval(updateInfoDiv, 1000);