import * as THREE from "../../three.js/src/Three.js";

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
                var cube = new THREE.Mesh4D(buff, material);
                cube.position[coord] = magnitude;
                cube.rotation[coord + 'w'] = 0.5 * Math.PI * magnitude;
                if (coord + 'w' == 'ww') {
                    cube.rotation['xz'] = Math.PI;
                    cube.rotation['zw'] = Math.PI;
                }
                cube.name = "tesscube " + magnitude + coord;
        
                cubes.push(cube);
            }
        }
        
        for (cube of cubes) {
            this.add(cube);
        }
    }
}

export { DevScene };