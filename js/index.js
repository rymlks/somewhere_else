import * as THREE from "./three.js/src/Three.js";
import { handleControls } from "./controls.js";

document.body.requestPointerLock();

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera4D( 75, window.innerWidth / window.innerHeight, 0.1, 1000, 0.1, 1000 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene4D();

var bbuf = new THREE.BoxBufferGeometry4D( 0.1, 0.1, 0.1, 1, 1, 1 );

var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
light.name = "grey ambient light";
scene.add( light );

var plight = new THREE.PointLight4D( 0xffffff, 1.0, 100 );
//plight.add( new THREE.Mesh4D( bbuf, new THREE.MeshBasicMaterial( { color: 0xfedcba } ) ) );
plight.position.set(3, 3, -3, 3);
plight.name = "white point light";
scene.add( plight );

var directionalLight = new THREE.DirectionalLight4D( 0xffffff, 0.25 );
directionalLight.position.set(-3, -3, -3, -10);
directionalLight.target = plight;
directionalLight.name = "white dir light";
scene.add( directionalLight );

var directionalLight = new THREE.DirectionalLight4D( 0xffffff, 0.25 );
directionalLight.position.set(3, 3, 3, 10);
directionalLight.target = plight;
directionalLight.name = "white dir light 2";
scene.add( directionalLight );



var geometry = new THREE.BoxBufferGeometry4D( 2, 2, 2, 1, 1, 1 );
var material = new THREE.MeshLambertMaterial ( { color: 0x8080ff } );
var frontcube = new THREE.Mesh4D( geometry, material );
frontcube.name="frontcube";
 
var geometry2 = new THREE.BoxBufferGeometry4D( 2, 2, 2, 1, 1, 1 );
var material2 = new THREE.MeshLambertMaterial ( { color: 0x80ff80 } );
var leftcube = new THREE.Mesh4D( geometry, material2 );
leftcube.name="leftcube";
leftcube.position.x = -1;
leftcube.rotation.xw = -Math.PI * 0.5;

var geometry = new THREE.BoxBufferGeometry4D( 2, 2, 2, 1, 1, 1 );
var material = new THREE.MeshLambertMaterial ( { color: 0x80ffff } );
var backcube = new THREE.Mesh4D( geometry, material );
backcube.name="backcube";
backcube.position.w = 2;
backcube.rotation.zw = Math.PI;

var geometry3 = new THREE.BoxBufferGeometry4D( 20, 2, 20, 1, 1, 1 );
var material3 = new THREE.MeshLambertMaterial ( { color: 0x808080 } );
var floor = new THREE.Mesh4D( geometry3, material3 );
floor.name="floor";
floor.position.y = -3;

frontcube.add(leftcube);
frontcube.add(backcube);
scene.add( frontcube );
scene.add( floor );

camera.position.z = 5;
camera.position.w = 1;
var orbit = 3;

var infodiv = document.getElementById("info");
function animate() {
	requestAnimationFrame( animate );

	handleControls(scene, camera);

	//cube.rotation.xw += 0.004;
	//cube.rotation.zx += 0.004;

	//cube.position.w = Math.sin(cube.rotation.xw) * orbit;
	//cube.position.x = Math.cos(cube.rotation.xw) * orbit;
	//cube.position.z = Math.sin(cube.rotation.xw) * orbit;

	renderer.render( scene, camera );
	infodiv.innerHTML  = "x: " + camera.position.x.toPrecision(4) + ", ";
	infodiv.innerHTML += "y: " + camera.position.y.toPrecision(4) + ", ";
	infodiv.innerHTML += "z: " + camera.position.z.toPrecision(4) + ", ";
	infodiv.innerHTML += "w: " + camera.position.w.toPrecision(4);
	infodiv.innerHTML += "<br/>";
	infodiv.innerHTML += "yz: " + (camera.rotation.yz * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "zx: " + (camera.rotation.zx * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "xy: " + (camera.rotation.xy * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "xw: " + (camera.rotation.xw * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "yw: " + (camera.rotation.yw * 180 / Math.PI).toPrecision(4) + ", ";
	infodiv.innerHTML += "zw: " + (camera.rotation.zw * 180 / Math.PI).toPrecision(4);
}
animate();
