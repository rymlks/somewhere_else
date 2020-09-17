import * as THREE from "./three.js/src/Three.js";
import { handleControls } from "./controls.js";

document.body.requestPointerLock();

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera4D( 75, window.innerWidth / window.innerHeight, 0.1, 1000, 0.1, 1000 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene4D();

var geometry = new THREE.BoxBufferGeometry4D( 2, 2, 2, 1, 1, 1 );
var material = new THREE.MeshLambertMaterial ( { color: 0xffff00 } );
var cube = new THREE.Mesh4D( geometry, material );
cube.name="centercube";
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;
cube.position.w = 0;

var geometry2 = new THREE.BoxBufferGeometry4D( 2, 2, 2, 1, 1, 1 );
var material2 = new THREE.MeshLambertMaterial ( { color: 0x00ffff } );
var cube2 = new THREE.Mesh4D( geometry2, material2 );
cube2.name="childcube";
cube2.position.w = -10;

var geometry3 = new THREE.BoxBufferGeometry4D( 20, 2, 20, 1, 1, 1 );
var material3 = new THREE.MeshLambertMaterial ( { color: 0x80ffff } );
var cube3 = new THREE.Mesh4D( geometry3, material3 );
cube3.name="floor";
cube3.position.y = -3;
cube3.position.w = 0;

var geometry4 = new THREE.BoxBufferGeometry4D( 20, 2, 20, 1, 1, 1 );
var material4 = new THREE.MeshLambertMaterial ( { color: 0xffff80 } );
var cube4 = new THREE.Mesh4D( geometry4, material4 );
cube4.name="floor";
cube4.position.y = -3;
cube4.position.w = -10;

var bbuf = new THREE.BoxBufferGeometry4D( 0.1, 0.1, 0.1, 1, 1, 1 );

var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
light.name = "grey ambient light";
scene.add( light );

var plight = new THREE.PointLight4D( 0xff0000, 1.0, 100 );
//plight.add( new THREE.Mesh4D( bbuf, new THREE.MeshBasicMaterial( { color: 0xfedcba } ) ) );
plight.position.set(3, 3, -3, 3);
plight.name = "white point light";
scene.add( plight );

var directionalLight = new THREE.DirectionalLight4D( 0x00ff00, 0.25 );
directionalLight.position.set(-3, -3, -3, -10);
directionalLight.target = plight;
directionalLight.name = "green dir light";
scene.add( directionalLight );

var directionalLight = new THREE.DirectionalLight4D( 0x0000ff, 0.25 );
directionalLight.position.set(3, 3, 3, 10);
directionalLight.target = plight;
directionalLight.name = "blue dir light";
scene.add( directionalLight );

cube.add(cube2);
scene.add( cube );
scene.add( cube3 );
//scene.add( cube4 );
//scene.add( cubelines );

camera.position.z = 5;
camera.position.w = 0;

var infodiv = document.getElementById("info");
function animate() {
	requestAnimationFrame( animate );

	handleControls(scene, camera);


	//cube.rotation.yz += 0.001;
	//cube.rotation.zx += 0.002;
	//cube.rotation.xy += 0.003;
	//cube.rotation.xw += 0.004;
	//cube.rotation.yw += 0.005;
	//cube.rotation.zw += 0.006;

	//cube.position.w = Math.sin(theta) * orbit - 5;
	//cube.position.z = Math.cos(theta) * orbit;

	//cube.position.x = Math.sin(theta) * orbit;
	//cube.position.y = Math.cos(theta) * orbit;

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
