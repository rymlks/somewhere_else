import * as THREE from "../../three.js/src/Three.js";

// TODO: Better objects definition for Scenes
class DevScene extends THREE.Scene4D {
    constructor() {
        super();
        const loader = new THREE.TextureLoader();
        const texture = loader.load( "assets/textures/testing.png" );
        texture.magFilter = THREE.NearestFilter;
        const amap = loader.load( "assets/textures/testing_map.png" );
        amap.magFilter = THREE.NearestFilter;

        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );
        
        var plight = new THREE.PointLight4D( 0xffffff, 1.0, 100 );
        plight.name = "white point light";

        var buff = new THREE.BoxBufferGeometry4D( 0.1, 0.1, 0.1, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var pcube = new THREE.PhysicsMesh4D(buff, material);
        pcube.position.set(3, -0.5, 3, 1);
        pcube.isAffectedByGravity = false;
        var time = 0;
        pcube.update = function(delta, scene) {
            time += delta;
            pcube.position.x = Math.sin(time) * 5;
            pcube.position.z = Math.cos(time) * 5;
        }

        pcube.name = "white point light cube";

        pcube.add(plight);
        this.add( pcube );
        
        /*
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
        */
        
        
        var cubes = [];

        var tbuff = new THREE.TesseractBufferGeometry4D( 2, 2, 2, 2, 1, 1, 1, 1 );
        var tmaterial = new THREE.MeshLambertMaterial( { color: 0x8080ff, transparent: true, opacity: 0.5, alphaMap: amap } );
        var tess = new THREE.PhysicsMesh4D(tbuff, tmaterial);
        tess.isAffectedByGravity = false;
        tess.position.x += 8;
        tess.position.w = 0;
        tess.name = "Tesseract";
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
        

        var buff2 = new THREE.BoxBufferGeometry4D( 10, 0.5, 10, 1, 1, 1 );
        var material2 = new THREE.MeshLambertMaterial( { color: 0x808080 } );
        var floor2 = new THREE.PhysicsMesh4D( buff2, material2 );
        floor2.name = "floor2";
        floor2.isAffectedByGravity = false;
        floor2.position.y = -10.5;
        floor2.position.w = 0

        this.add(floor2);

    }
}

export { DevScene };