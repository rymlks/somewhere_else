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


var cubes = [];
var color_map = {
	'x': 1,
	'y': 0x100,
	'z': 0x10000,
	'w': 1,
}

for (var magnitude = -1; magnitude <= 1; magnitude += 2) {
	for (var coord of ['x', 'y', 'z', 'w']) {
		var buff = new THREE.BoxBufferGeometry4D( 2, 2, 2, 1, 1, 1 );
		var colorslug = 0xff;
		if (coord === 'w') {
			colorslug = 0x80;
		}
		var color = colorslug * color_map[coord];
		var material = new THREE.MeshLambertMaterial( { color: color } );
		var cube = new THREE.Mesh4D(buff, material);
		cube.position[coord] = magnitude;
		cube.rotation[coord + 'w'] = 0.5 * Math.PI * magnitude;
		if (coord + 'w' == 'ww') {
			cube.rotation['xz'] = Math.PI;
			cube.rotation['zw'] = Math.PI;
		}
		cubes.push(cube);
	}
}

for (cube of cubes) {
	scene.add(cube);
}

camera.position.z = 5;
camera.position.w = 5;
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
