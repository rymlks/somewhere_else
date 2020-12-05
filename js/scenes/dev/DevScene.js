import * as THREE from "../../three.js/src/Three.js";
import { Scene } from "../../three.js/src/Three.js";

// TODO: Better objects definition for Scenes
class DevScene extends THREE.Scene4D {
    constructor() {
        super();
        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );
        
        var plight = new THREE.PointLight4D( 0xffffff, 1.0, 100 );
        plight.position.set(3, 3, -3, 3);
        plight.name = "white point light";
        this.add( plight );
        
        var directionalLight = new THREE.DirectionalLight4D( 0xffffff, 0.25 );
        directionalLight.position.set(-3, -3, -3, -10);
        directionalLight.target = plight;
        directionalLight.name = "white dir light";
        this.add( directionalLight );
        
        var directionalLight = new THREE.DirectionalLight4D( 0xffffff, 0.25 );
        directionalLight.position.set(3, 3, 3, 10);
        directionalLight.target = plight;
        directionalLight.name = "white dir light 2";
        this.add( directionalLight );
        
        
        var cubes = [];
        var colors = [
            0xffffff,
            0xffff80,
            0xff80ff,
            0x80ffff,
        
            0x808080,
            0x8080ff,
            0x80ff80,
            0xff8080
        ]
        
        for (var magnitude = -1; magnitude <= 1; magnitude += 2) {
            for (var coord of ['x', 'y', 'z', 'w']) {
                var buff = new THREE.BoxBufferGeometry4D( 2, 2, 2, 1, 1, 1 );
                var colorslug = 0xff;
                if (coord === 'w') {
                    colorslug = 0x80;
                }
                //var color = colorslug * color_map[coord];
                var material = new THREE.MeshLambertMaterial( { color: colors.pop() } );
                var cube = new THREE.PhysicsMesh4D(buff, material);
                cube.isAffectedByGravity = false;
                cube.position[coord] = magnitude;
                cube.rotation[coord + 'w'] = 0.5 * Math.PI * magnitude;
                if (coord + 'w' == 'ww') {
                    cube.rotation['xz'] = Math.PI;
                    cube.rotation['zw'] = Math.PI;
                }
                cube.name = "tesscube " + magnitude + coord;

                cube.position.x += 5;
        
                cubes.push(cube);
            }
        }

        var tbuff = new THREE.TesseractBufferGeometry4D( 2, 2, 2, 2, 1, 1, 1, 1 );
        var tmaterial = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
        var tess = new THREE.PhysicsMesh4D(tbuff, tmaterial);
        tess.isAffectedByGravity = false;
        tess.position.x += 8;
        tess.name = "THIS IS THE CORRECT OBJECT";
        this.add(tess);
        
        
        for (var i=0; i<100; i+= 5) {
            var buff = new THREE.BoxBufferGeometry4D( 2, 2, 2, 1, 1, 1 );
            var material = new THREE.MeshLambertMaterial( { color: Math.floor(Math.random()*16777215) } );
            var cube = new THREE.PhysicsMesh4D(buff, material);
            cube.name = "Falling Cube " + i;
            cube.position.y = i;
            cube.position.w = i % 2;
            cubes.push(cube);
        }
        
        for (cube of cubes) {
            this.add(cube);
        }

        var buff = new THREE.BoxBufferGeometry4D( 10, 0.5, 10, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var floor = new THREE.PhysicsMesh4D(buff, material);
        floor.name = "floor";
        floor.isAffectedByGravity = false;
        floor.position.y = -2.5;
        floor.position.w = 1

        this.add(floor);
        

    }
}

export { DevScene };